import "./styles.css";
import BackgroundImage from "../../assets/virtual-room.png";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <Header text='Entrar' />
      <main className='create-room'>
        <div className='create-room__card'>
          <h2 className='create-room__title'>Quer assistir algo?</h2>
          <button
            className='create-room__button'
            onClick={() => navigate("/home")}
          >
            Criar sua sala
          </button>
        </div>
        <img
          className='create-room__image'
          src={BackgroundImage}
          alt='Imagem de fundo'
        />
      </main>
    </div>
  );
};

export default CreateRoom;
