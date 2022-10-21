import Header from "../../components/Header";
import "./styles.css";
import io from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import Video from "../../components/Video";
import UserContext from "../../context/UserContext";

const myId = uuid();
const socket = io("http://localhost:8080");
socket.on("connect");

const Home = () => {
  const { message, setMessage, data, setData } = useContext(UserContext);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    let localData = { ...data };

    localData.messages.push({
      id: myId,
      message,
    });

    socket.emit("chat.message", localData);
    setMessage("");
  };

  // useEffect(() => {
  //   socket.emit("chat.message", data);
  // }, [data.url]);

  useEffect(() => {
    const handleEditData = (newData) => {
      console.log(newData);
      setData({ ...newData });
    };

    socket.on("chat.message", handleEditData);

    return () => socket.off("chat.message", handleEditData);
  }, [data.messages]);

  return (
    <div className='container'>
      <Header text='Sair' />
      <main className='home'>
        <Video />
        <section className='home__chat'>
          <div className='home__message-list'>
            {data.messages.map((m, index) => {
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
          <form className='home__action' action='' onSubmit={sendMessage}>
            <input
              className='home__input'
              type='text'
              placeholder='Digite sua mensagem'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
            />
            <button className='home__button'>+</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Home;
