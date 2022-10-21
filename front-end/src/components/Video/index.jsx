import "./styles.css";
import UserContext from "../../context/UserContext";
import { useContext } from "react";

const Video = ({ socket }) => {
  const { url, setUrl, urlCode, setUrlCode } = useContext(UserContext);

  const handleSendUrl = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      return;
    }

    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[7].length === 11) {
      setUrlCode(match[7]);
      socket.emit("chat.url", match[7]);
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
            src={`https://www.youtube.com/embed/${urlCode}`}
            title='Vídeo'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
          ></iframe>
        ) : (
          <h2 className='video__warning'>Nenhum vídeo selecionado</h2>
        )}
      </div>

      <form className='video__action' action='' onSubmit={handleSendUrl}>
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
    </section>
  );
};

export default Video;
