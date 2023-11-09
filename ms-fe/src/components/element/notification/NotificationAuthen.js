import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [context, setContext] = useState(null);

  const showSuccessNotification = (message, context) => {
    setSuccessMessage(message);
    setContext(context);
  };

  const clearNotification = () => {
    setSuccessMessage(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        successMessage,
        showSuccessNotification,
        clearNotification,
        context,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
