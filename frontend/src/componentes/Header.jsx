import '../estilos/Header.css'
import logo from '../assets/bus-logo.png'
import { useLocation } from 'react-router-dom';


export default function Header({ setLoginModal, usuario }) {

  const location = useLocation();
  const esRutaInicio = location.pathname === "/";

  const handleCerrarSesion = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
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
        {
          !usuario ?
            <button className="login-button"
              style={{ display: `${!esRutaInicio ? 'none' : ''}` }}
              onClick={() => { setLoginModal(true) }}>Iniciar sesión</button>
            :
            <div>
              Bienvenido, {usuario[0].nombre}!
              <button onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </div>
        }

      </nav>
    </header>
  )
}