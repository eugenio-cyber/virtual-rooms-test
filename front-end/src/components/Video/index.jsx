import "./styles.css";
import UserContext from "../../context/UserContext";
import { useContext, useState } from "react";

const Video = ({ setData, data }) => {
  const { socket } = useContext(UserContext);
  const [url, setUrl] = useState("");

  const handleSendUrl = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      return;
    }

    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[7].length === 11) {
      const localData = { ...data };
      localData.urlCode = match[7];

      setData({ ...localData });

      socket.emit("chat.update", localData);
      setUrl("");
    }
  };

  return (
    <section className='video'>
      <div className='video__content'>
        {data.urlCode ? (
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${data.urlCode}`}
            title='Vídeo'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
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
        <span className='video__watching'>{data.connections} conectados</span>
        <span className='video__watching--mobile'>{data.connections}</span>
      </div>
    </section>
  );
};

export default Video;
