import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./componentes/Header";
import rombusBus from './assets/rombusBus.jpeg'
import ComprarTicket from "./componentes/ComprarTicket";
import NuestrosDestinos from "./componentes/NuestrosDestinos";
import Login from "./componentes/login";
import ServiciosOfrecidos from "./componentes/ServiciosOfrecidos";
import AtencionCliente from "./componentes/AtencionCliente";
import Footer from "./componentes/Footer";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const [buscandoViaje, setBuscandoViaje] = useState(false)

  useEffect(() => {
    const verificarJWT = async (token) => {
      try {
        const response = await fetch('http://localhost:5000/usuarioLogeado', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Incluye el token en el header
          },
        });
        const data = await response.json();
        console.log(data)
        if (data.ok) {
          setUser(data.usuario)
        }

      } catch (error) {
        console.error(error);
      }
    };
    verificarJWT(token)
  }, [])

  useEffect(() => {
    console.log(user[0])
  }, [user])

  return (
    <div className="App">
      <Header setLoginModal={setLoginModal} usuario={user} />
      <main className="main-container">
        <div className="main-title">
          <p>Viajar nunca fue tan facil y seguro!</p>
          <p>Elige viajar con Rombus Viajes!</p>
        </div>
        <div className="main-img">
          <img src={rombusBus} alt="imagen-bus" />
        </div>
      </main>
      <ComprarTicket
        buscandoViaje={buscandoViaje}
        setBuscandoViaje={setBuscandoViaje}
      />
      <NuestrosDestinos />
      <ServiciosOfrecidos />
      <AtencionCliente />
      {
        loginModal &&
        <Login setLoginModal={setLoginModal} />
      }
      {
        buscandoViaje &&
        <div className="buscando-viaje-modal">
          <div className="buscando-viaje--box">
            <p>Buscando la mejor opción...</p>
            <button onClick={() => { setBuscandoViaje(false) }}>Cancelar Busqueda</button>
          </div>
        </div>
      }
      <Footer></Footer>
    </div>
  );
}

export default App;
