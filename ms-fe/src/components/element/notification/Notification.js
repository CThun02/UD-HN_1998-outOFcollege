import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState(null);

  const showSuccessNotification = (message) => {
    setSuccessMessage(message);
  };

  const clearNotification = () => {
    setSuccessMessage(null);
  };

  return (
    <NotificationContext.Provider
      value={{ successMessage, showSuccessNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
