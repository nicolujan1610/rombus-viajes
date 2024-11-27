import '../estilos/Header.css'
import logo from '../assets/bus-logo.png'

export default function Header({ setLoginModal }) {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Rombus Up Logo" />
        <h1>Rombus Up</h1>
      </div>
      <nav>
        <a href="#destino">Destinos</a>
        <a href="#servicios">Servicios</a>
        <a href="#atencion">Atención al cliente</a>
        <button className="login-button" onClick={() => { setLoginModal(true) }}>Iniciar sesión</button>
      </nav>
    </header>
  )
}