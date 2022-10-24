import "./styles.css";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../../utils/storage";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Header = ({ text, setShowModal, data, setData, setShowProgress }) => {
  const { socket } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickLink = () => {
    if (text === "Sair") {
      let localData = { ...data };

      localData.connections--;
      setData(localData);

      setShowProgress(true);

      setTimeout(() => {
        setShowProgress(false);
        removeItem("name");
        socket.emit("chat.leave");
        navigate("/");
      }, 1000);
      return;
    }

    setShowModal(true);
  };

  return (
    <header className='header'>
      <nav className='header__nav'>
        <h1 className='header__logo'>Virtual Rooms</h1>
        <ul className='header__list' onClick={() => handleClickLink()}>
          <li className='header__link'>{text}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
