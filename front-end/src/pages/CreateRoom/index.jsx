import "./styles.css";
import BackgroundImage from "../../assets/virtual-room.png";
import Header from "../../components/Header";
import { useState } from "react";
import BasicModal from "../../components/BasicModal";

const CreateRoom = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='container'>
      <Header text='Criar Sala' setShowModal={setShowModal} />
      <main className='create-room'>
        <div className='create-room__card'>
          <h2 className='create-room__title'>Quer assistir algo?</h2>
          <button
            className='create-room__button'
            onClick={() => setShowModal(true)}
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
      {showModal && (
        <BasicModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default CreateRoom;
