import "./styles.css";
import { useNavigate } from "react-router-dom";

const Header = ({ text }) => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <nav className='header__nav'>
        <h1 className='header__logo'>Virtual Rooms</h1>
        <ul
          className='header__list'
          onClick={() => (text === "Sair" ? navigate("/") : navigate("/home"))}
        >
          <li className='header__link'>{text}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
