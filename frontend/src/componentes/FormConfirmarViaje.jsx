import { useEffect, useState } from 'react'
import '../estilos/FormConfirmarViaje.css'

import { useNavigate } from 'react-router-dom'

export default function FormConfirmarViaje({ asientoSelected, viajeId, infoViaje }) {

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(false)
  const [costoViaje, setCostoViaje] = useState('')

  const [form, setForm] = useState({
    nombre: '',
    dni: '',
    correo: ''
  })
  const [confirmarViajeModal, setconfirmarViajeModal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setForm({
      nombre: `${user.nombre} ${user.apellido}`,
      dni: `${user.dni}`,
      correo: `${user.email}`

    })
  }, [user])

  useEffect(() => {
    // funcion para verificar el jwt
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
          setUser(data.usuario[0])
        }

      } catch (error) {
        console.error(error);
      }
    };
    token ? verificarJWT(token) : ''

    // funcion para traer el costo del viaje
    const getCosto = async (viajeId) => {
      const consulta = await fetch(`http://localhost:5000/tarifas/${viajeId}`)
      const res = await consulta.json()
      setCostoViaje(res[0].costo)
    }
    getCosto(viajeId)



  }, [])

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const handleComprarViaje = (e) => {
    e.preventDefault()
    setconfirmarViajeModal(true)
  }

  const comprarViajeFinal = async () => {
    let nuevosAsientos = infoViaje.asientos.filter(asiento => asiento != asientoSelected)
    let data = {
      asientosNuevo: nuevosAsientos,
      viajeId: viajeId
    }
    const consulta = await fetch("http://localhost:5000/asientosNuevos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await consulta.json()
    if (res.ok) {
      setTimeout(() => {
        alert('Compra exitosa! Felicitaciones')
        navigate('/')
      }, [1000])
    } else {
      setTimeout(() => {
        alert('Ha ocurrido un error, intente nuevamente')
        navigate('/')
      }, [1000])
    }

  }

  return (
    <div className='confirmar-viaje--container'>
      <form className='confirmar-viaje--form' onSubmit={handleComprarViaje}>
        <label htmlFor="nombre">Nombre y Apellido</label>
        <input type="text" id='nombre' placeholder='Facundo Tejada' value={form.nombre} required onChange={handleInputChange} />
        <label htmlFor="correo">Correo</label>
        <input type="email" placeholder='facutejada23@gmail.com' id='correo' value={form.correo} required onChange={handleInputChange} />
        <label htmlFor="dni">DNI</label>
        <input type="number" placeholder='42141234' required id='dni' value={form.dni} onChange={handleInputChange} />
        <p>Tarifa:</p>
        <p>${costoViaje}</p>
        <button>Confirmar Viaje</button>
      </form>
      {
        confirmarViajeModal &&
        <div className='comprar-viaje--modal'>
          <div className='comprar-viaje--box'>
            <div className='exit-comprar-viaje' onClick={() => { setconfirmarViajeModal(false) }}>X</div>
            <p>Confirme su viaje:</p>
            <div>
              <p>Origen: {infoViaje.origen}</p>
              <p>Destino: {infoViaje.destino}</p>
              <p>Salida: {infoViaje.horario_salida}</p>
              <p>Llegada: {infoViaje.horario_llegada}</p>
              <p>Pasajero: {form.nombre}</p>
              <p>DNI: {form.dni}</p>
              <p>Correo: {form.correo}</p>
              <p>Asiento: {asientoSelected}</p>
              <p>Tarifa: ${costoViaje}</p>
            </div>
            <button onClick={comprarViajeFinal}>Pagar y confirmar</button>
          </div>
        </div>
      }
    </div>
  )
}