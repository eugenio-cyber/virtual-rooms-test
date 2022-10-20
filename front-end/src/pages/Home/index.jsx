import Header from "../../components/Header";
import "./styles.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const myId = uuid();
const socket = io("http://localhost:8080");
socket.on("connect");

function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat.message", {
        id: myId,
        message,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setMessages([...messages, newMessage]);
    };
    socket.on("chat.message", handleNewMessage);
    return () => socket.off("chat.message", handleNewMessage);
  }, [messages]);

  return (
    <div className='container'>
      <Header />
      <main className='home'>
        <section className='home__video'></section>
        <section className='home__chat'>
          <div className='home__message-list'>
            {messages.map((m, index) => {
              return (
                <span
                  className={`home__message ${
                    m.id === myId ? "mine" : "other"
                  }`}
                  key={index}
                >
                  {m.message}
                </span>
              );
            })}
          </div>
          <div className='home__action'>
            <input
              className='home__input'
              type='text'
              placeholder='Digite sua mensagem'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button className='home__button' onClick={() => sendMessage()}>
              +
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
