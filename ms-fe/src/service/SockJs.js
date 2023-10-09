import { useState, useEffect } from "react";
import SockJsClient from "react-stomp";
const SOCKET_URL = "http://localhost:8080/ms-app/";

function SockJs({ setValues, connectTo }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDelayed(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const onConnected = () => {
    console.log("Connected!!");
    setIsConnected(true);
  };

  const onDisConnected = () => {
    console.log("Disconnected!!");
    setIsConnected(false);
  };

  const onMessageReceived = (msg) => {
    if (isConnected) {
      setValues(msg);
    }
  };

  return (
    <>
      <SockJsClient
        url={SOCKET_URL}
        topics={[`/topic/${connectTo}`]}
        onConnect={onConnected}
        onDisconnect={onDisConnected}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      />
    </>
  );
}

export default SockJs;
