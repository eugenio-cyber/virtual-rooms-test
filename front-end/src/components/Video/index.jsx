import "./styles.css";
import UserContext from "../../context/UserContext";
import { useContext } from "react";

const Video = () => {
  const { url, setUrl, urlCode, setUrlCode, data, setData } =
    useContext(UserContext);

  const handleSendUrl = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      return;
    }

    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);

    setUrlCode(match && match[7].length === 11 ? match[7] : false);

    setData({ ...data, [url]: urlCode });

    setUrl("");
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
