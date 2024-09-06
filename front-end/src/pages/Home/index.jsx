import Header from "../../components/Header";
import "./styles.css";
import { useEffect, useContext } from "react";
import Video from "../../components/Video";
import { ChatContext } from "../../context/ChatContext";
import { useState } from "react";
import Message from "../../components/Message";
import Progress from "../../components/Progress";

const Home = () => {
  const { socket } = useContext(ChatContext);
  const myId = socket.id;

  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    socket.on("receive_message", (message_info) => {
      setMessageList((current) => [...current, message_info]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("chat_update", message);
    setMessage("");
  };

  return (
    <div className='container'>
      <Header text='Sair' setShowProgress={setShowProgress} />

      <main className='home'>
        <Video />

        <section className='home__chat'>
          <div className='home__message-list'>
            {messageList.map((messageInfo, index) => (
              <Message myId={myId} key={index} messageInfo={messageInfo} />
            ))}
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
