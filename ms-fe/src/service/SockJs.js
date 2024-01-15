import { useEffect, useState, useContext } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import { NotificationContext } from "../components/element/notification/NotificationAuthen";

const SOCKET_URL = "http://localhost:8080/ms-app/";

function SockJs({
  setValues,
  connectTo,
  setIsMessage,
  isMessage,
  setIsLoading,
  isLoading,
}) {
  const [stompClient, setStompClient] = useState();
  const [connected, setConnected] = useState(false);
  const { showSuccessNotification } = useContext(NotificationContext);

  const connect = () => {
    let sock = new SockJS(SOCKET_URL);
    let temp = over(sock);
    setStompClient(temp);

    temp.connect({}, onConnect, onError);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onConnect = () => {
    setConnected(true);
  };

  const onMessageReceived = (msg) => {
    console.log("New Message Received!!", msg);
    if (msg.body) {
      console.log("New Message Received If!!", msg.body);
      if (isMessage) {
        const json = JSON.parse(msg.body);
        const isReload = json?.isReload;
        const notificationList = json?.notificationList;

        if (isReload) {
          showSuccessNotification("Xác nhận đơn hàng", "confirm-order");
        }
        setValues(notificationList);
        setIsMessage((bool) => !bool);
      } else {
        setValues(JSON.parse(msg.body));
        if (isLoading) {
          setIsLoading((bool) => !bool);
        }
      }
    }
  };

  useEffect(function () {
    if (connected && stompClient?.connected) {
      const subcription = stompClient.subscribe(
        "/topic/" + connectTo,
        onMessageReceived
      );

      return () => {
        subcription.unsubscribe();
      };
    }
  });

  useEffect(() => {
    return () => connect();
  }, [Math.random]);
}

export default SockJs;
