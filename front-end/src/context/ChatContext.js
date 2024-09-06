import { createContext } from "react";
import io from "socket.io-client";

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
  const socket = io("http://localhost:8080");

  return (
    <ChatContext.Provider value={{ socket }}>{children}</ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
