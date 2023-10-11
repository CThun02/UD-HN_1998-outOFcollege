import { useEffect } from "react";
import { useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

const SOCKET_URL = "http://localhost:8080/ms-app/";

function SockJs({ setValues, connectTo }) {
  const [stompClient, setStompClient] = useState();
  const [connected, setConnected] = useState(false);

  const connect = () => {
    const sock = new SockJS(SOCKET_URL);
    const temp = over(sock);
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
    setValues(JSON.parse(msg.body));
  };

  useEffect(function () {
    if (connected && stompClient.connected) {
      const subcription = stompClient.subscribe(
        "/topic/" + connectTo,
        onMessageReceived
      );

      console.log("topic: ", "/topic/" + connectTo);

      return () => {
        subcription.unsubscribe();
      };
    }
  });

  useEffect(() => {
    connect();
  }, []);
}

export default SockJs;
