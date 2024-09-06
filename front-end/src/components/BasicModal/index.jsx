import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { style } from "./styles.js";
import { setItem } from "../../utils/storage";
import { ChatContext } from "../../context/ChatContext.js";
import "./styles.css";

const BasicModal = ({ showModal, setShowModal, setShowProgress }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { socket } = useContext(ChatContext);
  const userId = uuid();

  const handleAddName = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setItem("user_id", userId);
    socket.emit("set_username", name);
    setShowModal(false);
    setShowProgress(true);

    setTimeout(() => {
      setShowProgress(false);
      navigate("/home");
    }, 500);
  };

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Digite seu nome:
        </Typography>
        <form className='modal__form' action='' onSubmit={handleAddName}>
          <input
            className='modal__input'
            type='text'
            placeholder='Digite seu nome'
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <button className='modal__button'>Entrar</button>
        </form>
      </Box>
    </Modal>
  );
};

export default BasicModal;
