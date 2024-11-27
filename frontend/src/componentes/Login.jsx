import "../estilos/Login.css";

function Login({ setLoginModal }) {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="iniciar-sesion">Iniciar Sesión</h2>
        <form className="login-form">
          <input type="text" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit" className="login-button">Ingresar</button>
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
