import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { style } from "./styles.js";
import { setItem } from "../../utils/storage";
import "./styles.css";

const BasicModal = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleAddName = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    setItem("name", name);
    navigate("/home");
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
