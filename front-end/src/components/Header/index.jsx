import "./styles.css";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../../utils/storage";

const Header = ({ text, setShowModal }) => {
  const navigate = useNavigate();

  const handleClickLink = () => {
    if (text === "Sair") {
      removeItem("name");
      navigate("/");
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
