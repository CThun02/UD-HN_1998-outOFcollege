import { useState } from "react";
import SockJsClient from "react-stomp";
const SOCKET_URL = "http://localhost:8080/ms-app/";

function SockJs({ setValues, connectTo }) {
  const [isConnected, setIsConnected] = useState(false);

  let onConnected = () => {
    console.log("Connected!!");
    console.log("Connected To: ", connectTo);
    setIsConnected(true);
  };

  let onDisConnected = () => {
    console.log("Disconnected!!");
    setIsConnected(false);
  };

  let onMessageReceived = (msg) => {
    setTimeout(() => {
      if (isConnected) {
        console.log("New Message: ", msg);
        setValues(msg);
      }
    }, 2000);
  };

  return (
    <SockJsClient
      url={SOCKET_URL}
      topics={[`/topic/${connectTo}`]}
      onConnect={onConnected}
      onDisconnect={onDisConnected}
      onMessage={(msg) => onMessageReceived(msg)}
      debug={false}
    />
  );
}

export default SockJs;
