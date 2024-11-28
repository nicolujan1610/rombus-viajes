import React, { useState } from "react";
import "./App.css";
import Header from "./componentes/Header";
import rombusBus from './assets/rombusBus.jpeg'
import ComprarTicket from "./componentes/ComprarTicket";
import NuestrosDestinos from "./componentes/NuestrosDestinos";
import Login from "./componentes/login";
import ServiciosOfrecidos from "./componentes/ServiciosOfrecidos";
import AtencionCliente from "./componentes/AtencionCliente";

function App() {
  const [loginModal, setLoginModal] = useState(false)

  return (
    <div className="App">
      <Header setLoginModal={setLoginModal} />
      <main className="main-container">
        <div className="main-title">
          <p>Viajar nunca fue tan facil y seguro!</p>
          <p>Elige viajar con Rombus Viajes!</p>
        </div>
        <div className="main-img">
          <img src={rombusBus} alt="imagen-bus" />
        </div>
      </main>
      <ComprarTicket />
      <NuestrosDestinos />
      <ServiciosOfrecidos />
      <AtencionCliente />
      <footer className="footer">
        <p>Rombus Up Todos los derechos reservados.</p>
      </footer>
      {
        loginModal &&
        <Login setLoginModal={setLoginModal} />
      }
    </div>
  );
}

export default App;
