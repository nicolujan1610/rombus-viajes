import '../estilos/ComprarTicket.css'

export default function ComprarTicket() {

  return (
    <section className="ticket-section">
      <h3>Saca tu pasaje!</h3>
      <form className="ticket-form">
        <input type="text" placeholder="Origen" />
        <input type="text" placeholder="Destino" />
        <input type="date" />
        <select name="pasajeros">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <div className="radio-buttons">
          <label>
            <input type="radio" name="trip-type" value="round" />
            Ida y vuelta
          </label>
          <label>
            <input type="radio" name="trip-type" value="oneway" /> Sólo ida
          </label>
        </div>
        <button type="submit" className="search-button">Buscar</button>
      </form>
    </section>
  )
}