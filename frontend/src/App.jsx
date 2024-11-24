import React from "react";
import "./App.css";
import Header from "./componentes/Header";
import backgroundConTexto from './assets/Background-con-texto.png'

function App() {
  return (
    <div className="App">
      <Header />


      <main className="main-content">
        <div className="body_div">
          <img src={backgroundConTexto} alt="imagen-bus" height={900} />
        </div>
      </main>

      <section className="ticket-section">
        <h3>Pasajes</h3>
        <form className="ticket-form">
          <input type="text" placeholder="Origen" />
          <input type="text" placeholder="Destino" />
          <input type="date" />
          <input type="number" placeholder="Pasajeros" />
          <div className="radio-buttons">
            <label>
              <input type="radio" name="trip-type" value="round" /> Ida y vuelta
            </label>
            <label>
              <input type="radio" name="trip-type" value="oneway" /> Sólo ida
            </label>
          </div>
          <button type="submit" className="search-button">Buscar</button>
        </form>
      </section>

      <footer className="footer">
        <p>Rombus Up Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
