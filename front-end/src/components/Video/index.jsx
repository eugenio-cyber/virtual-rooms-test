import "./styles.css";
import { ChatContext } from "../../context/ChatContext";
import { useContext, useState, useEffect } from "react";

const Video = ({}) => {
  const { socket } = useContext(ChatContext);
  const [urlCode, setUrlCode] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    socket.on("receive_url", (newUrlCode) => {
      setUrlCode(newUrlCode);
    });

    return () => socket.off("receive_url");
  }, [socket]);

  const handleSendUrl = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[7].length === 11) {
      socket.emit("update_url", match[7]);
      setUrl("");
    }
  };

  return (
    <section className='video'>
      <div className='video__content'>
        {urlCode ? (
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${urlCode}?autoplay=1`}
            title='Vídeo'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        ) : (
          <h2 className='video__warning'>Nenhum vídeo selecionado</h2>
        )}
      </div>
      <div className='video__action'>
        <form className='video__form' action='' onSubmit={handleSendUrl}>
          <input
            className='video__input'
            type='text'
            placeholder='Cole seu do YouTube link aqui'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button className='video__button'>Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default Video;
