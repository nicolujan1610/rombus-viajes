import { useState } from 'react'
import '../estilos/FormConfirmarViaje.css'

export default function FormConfirmarViaje({ asientoSelected }) {
  const [form, setForm] = useState({
    nombre: '',
    dni: '',
    correo: ''
  })

  const [confirmarViajeModal, setconfirmarViajeModal] = useState(false)

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

    alert('viaje comprado!!')
  }

  return (
    <div className='confirmar-viaje--container'>
      <form className='confirmar-viaje--form' onSubmit={handleComprarViaje}>
        <label htmlFor="nombre">Nombre y Apellido</label>
        <input type="text" id='nombre' placeholder='Facundo Tejada' required onChange={handleInputChange} />
        <label htmlFor="correo">Correo</label>
        <input type="email" placeholder='facutejada23@gmail.com' id='correo' required onChange={handleInputChange} />
        <label htmlFor="dni">DNI</label>
        <input type="number" placeholder='42141234' required id='dni' onChange={handleInputChange} />
        <button>Confirmar Viaje</button>
      </form>
      {
        confirmarViajeModal &&
        <div className='comprar-viaje--modal'>
          <div className='comprar-viaje--box'>
            <div className='exit-comprar-viaje' onClick={() => { setconfirmarViajeModal(false) }}>X</div>
            <p>Confirme su viaje:</p>
            <div>
              <p>Pasajero: {form.nombre}</p>
              <p>DNI: {form.dni}</p>
              <p>Correo: {form.correo}</p>
              <p>Asiento: {asientoSelected}</p>
            </div>
            <button onClick={comprarViajeFinal}>Pagar y confirmar</button>
          </div>
        </div>
      }
    </div>
  )
}