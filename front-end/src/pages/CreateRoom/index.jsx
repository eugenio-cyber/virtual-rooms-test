import "./styles.css";
import BackgroundImage from "../../assets/virtual-room.png";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import BasicModal from "../../components/BasicModal";
import Progress from "../../components/Progress";
import { clear } from "../../utils/storage";

const CreateRoom = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    clear();
  }, []);

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
        <BasicModal
          showModal={showModal}
          setShowModal={setShowModal}
          setShowProgress={setShowProgress}
        />
      )}
      {showProgress && <Progress />}
    </div>
  );
};

export default CreateRoom;
