import { useEffect, useState } from 'react'
import '../estilos/ComprarTicket.css'

export default function ComprarTicket() {

  const [destinos, setDestinos] = useState([
    'La Rioja',
    'Catamarca',
    'Tucuman',
    'San Luis',
    'Salta',
    'Jujuy',
    'Mendoza',
  ])

  const [form, setForm] = useState({
    origen: 'x',
    destino: 'x',
    fecha: 'x'
  })

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.origen == 'x') {
      alert('Seleccione el origen!')
      return
    }
    if (form.destino == 'x') {
      alert('Seleccione el destino!')
      return
    }
    if (form.origen == form.destino) {
      alert('El origen y el destino no pueden ser iguales!')
      return
    }
    if (form.cantidad == 0) {
      alert('Seleccione cantidad de pasajes!')
      return
    }

    console.log(form)
  }

  return (
    <section className="ticket-section">
      <h3>Saca tu pasaje!</h3>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <select name="origen" id="origen" defaultValue={'x'} onChange={handleInputChange}>
          <option value="x" disabled>Selecciona el origen</option>
          {destinos.map(origen => (
            <option key={origen} value={origen}>{origen}</option>
          ))}

        </select>
        <select name="destino" id="destino" defaultValue={'x'} onChange={handleInputChange}>
          <option value="x" disabled>Selecciona el destino</option>
          {
            destinos.map(destino => (
              <option key={destino} value={destino}>{destino}</option>
            ))
          }
        </select>
        <input type="date" id='fecha' onChange={handleInputChange} required />
        <button type="submit" className="search-button">Buscar</button>
      </form>
    </section>
  )
}