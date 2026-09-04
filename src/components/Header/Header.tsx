import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <a href="#" className="logo">
          BURGUER<span>GERU</span>
        </a>

        <nav className="nav">
          <a href="#inicio">Início</a>
          <a href="#experiencia">Experiência</a>
          <a href="#menu">Cardápio</a>
        </nav>

        <a href="#menu" className="header-button">
          Pedir agora
        </a>
      </div>
    </header>
  );
}

export default Header;