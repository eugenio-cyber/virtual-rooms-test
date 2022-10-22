import Header from "../../components/Header";
import "./styles.css";
import { useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import Video from "../../components/Video";
import UserContext from "../../context/UserContext";
import { useState } from "react";
import { getItem } from "../../utils/storage";
import Message from "../../components/Message";

const myId = uuid();

const Home = () => {
  const { message, setMessage, data, setData, urlCode, setUrlCode, socket } =
    useContext(UserContext);

  const [name, setName] = useState();

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

    socket.emit("chat.data", localData);
    setMessage("");
  };

  useEffect(() => {
    const handleEditUrlCode = (newUrlCode) => {
      setUrlCode(newUrlCode);
    };

    socket.on("chat.url", handleEditUrlCode);

    return () => socket.off("chat.url", handleEditUrlCode);
  }, [urlCode]);

  useEffect(() => {
    const handleEditData = (newData) => {
      setData({ ...newData });
    };

    socket.on("chat.data", handleEditData);

    return () => socket.off("chat.data", handleEditData);
  }, [data.messages]);

  useEffect(() => {
    const handleAddConnection = (ar) => {
      let localData = { ...data };
      localData.connections = ar.connections;

      setData(localData);
    };

    socket.on("chat.users", handleAddConnection);

    return () => socket.off("chat.users", handleAddConnection);
  }, [data.connections]);

  useEffect(() => {
    setName(getItem("name"));
  }, []);
  return (
    <div className='container'>
      <Header text='Sair' />
      <main className='home'>
        <Video socket={socket} />
        <section className='home__chat'>
          <div className='home__message-list'>
            {data.messages.map((m, index) => {
              return (
                <Message
                  name={name}
                  text={m.message}
                  index={index}
                  id={m.id}
                  myId={myId}
                />
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
