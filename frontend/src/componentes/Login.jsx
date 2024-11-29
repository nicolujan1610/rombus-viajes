import { useState } from "react";
import "../estilos/Login.css";

function Login({ setLoginModal }) {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(loginForm)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="iniciar-sesion">Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Correo electrónico" id="email" onChange={handleInputChange} required />
          <input type="password" placeholder="Contraseña" required id="password" onChange={handleInputChange} />
          <button className="login-button">Ingresar</button>
        </form>
        <p className="signup-prompt">
          ¿No tienes una cuenta? <a href="/signup">Regístrate aquí</a>
        </p>
        <p className="cerrar-login-button" onClick={
          () => {
            setLoginModal(false)
          }
        }>X</p>
      </div>
    </div>
  );
}

export default Login;
