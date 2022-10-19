import "./styles.css";
import BackgroundImage from "../../assets/virtual-room.png";
import Header from "../../components/Header";

const CreateRoom = () => {
  return (
    <div className='container'>
      <Header />
      <main className='create-room'>
        <div className='create-room__card'>
          <h2 className='create-room__title'>Quer assistir algo?</h2>
          <button className='create-room__button'>Criar sua sala</button>
        </div>
        <img
          className='create-room__image'
          src={BackgroundImage}
          alt='Imagem de fondo'
        />
      </main>
    </div>
  );
};

export default CreateRoom;
