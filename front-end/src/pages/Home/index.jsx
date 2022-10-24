import Header from "../../components/Header";
import "./styles.css";
import { useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import Video from "../../components/Video";
import UserContext from "../../context/UserContext";
import { useState } from "react";
import { getItem } from "../../utils/storage";
import Message from "../../components/Message";
import Progress from "../../components/Progress";

const myId = uuid();

const Home = () => {
  const { socket } = useContext(UserContext);

  const [name, setName] = useState();
  const [message, setMessage] = useState("");
  const [urlCode, setUrlCode] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [data, setData] = useState({
    urlCode: "",
    connections: 0,
    messages: [],
  });

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    let localData = { ...data };

    localData.messages.push({
      id: myId,
      name,
      message,
    });

    socket.emit("chat.update", localData);
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
    const updateData = (newData) => {
      setData({ ...newData });
    };

    socket.on("chat.update", updateData);

    return () => socket.off("chat.update", updateData);
  }, [data.messages]);

  useEffect(() => {
    const getData = (db) => {
      setData({ ...db });
    };

    socket.on("chat.leave", getData);

    return () => socket.off("chat.leave", getData);
  }, [data]);

  useEffect(() => {
    setName(getItem("name"));

    const getData = (db) => {
      setData({ ...db });
    };

    socket.on("chat.open", getData);

    return () => socket.off("chat.open", getData);
  }, []);

  return (
    <div className='container'>
      <Header
        text='Sair'
        data={data}
        setData={setData}
        setShowProgress={setShowProgress}
      />
      <main className='home'>
        <Video data={data} setData={setData} />
        <section className='home__chat'>
          <div className='home__message-list'>
            {data.messages.map((messageInformation, index) => {
              return (
                <Message
                  myId={myId}
                  index={index}
                  messageInformation={messageInformation}
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
      {showProgress && <Progress />}
    </div>
  );
};

export default Home;
