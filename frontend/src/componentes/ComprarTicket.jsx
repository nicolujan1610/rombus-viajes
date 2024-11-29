import { useEffect, useState } from 'react'
import '../estilos/ComprarTicket.css'
import { useNavigate } from 'react-router-dom'

export default function ComprarTicket({ buscandoViaje, setBuscandoViaje }) {

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

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
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

    setBuscandoViaje(true)
    const consulta = await fetch(`http://localhost:5000/viajes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const res = await consulta.json()
    console.log(res)

    setTimeout(() => {
      navigate(`/comprar?viajeId=${res[0].id_viajes}`)
    }, 1500)


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