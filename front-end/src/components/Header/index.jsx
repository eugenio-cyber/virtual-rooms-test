import "./styles.css";

const Header = () => {
  return (
    <header className='header'>
      <nav className='header__nav'>
        <h1 className='header__logo'>Virtual Rooms</h1>
        <ul className='header__list'>
          <li className='header__link'>Home</li>
          <li className='header__link'>Registrar</li>
          <li className='header__link'>Entrar</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
