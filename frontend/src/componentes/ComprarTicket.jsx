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
    if (form.cantidad == 0) {
      alert('Seleccione cantidad de pasajes!')
      return
    }

    setBuscandoViaje(true)
    setTimeout(() => {
      navigate('/comprar')
    }, 1500)


    try {
      let url = 'http://localhost:5000/viajes'
      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!respuesta.ok) {
        throw new Error(`Error en la petición: ${respuesta.statusText}`);
      }

      const resultado = await respuesta.json()

    } catch (error) {

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