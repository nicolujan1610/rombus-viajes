import { useEffect, useState } from 'react'
import '../estilos/AtencionCliente.css'

export default function AtencionCliente() {

  const [formAtencion, setFormAtencion] = useState({
    nombre: '',
    dni: 0,
    telefono: 0,
    email: '',
    motivo: 'x',
    descripcion: ''
  })

  const handleInputChange = (e) => {
    setFormAtencion({
      ...formAtencion,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formAtencion.motivo == 'x') {
      alert('Seleccione un motivo')
      return
    }
    const consulta = await fetch("http://localhost:5000/consultas", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formAtencion)
    })
    const res = await consulta.json()
    alert('Consulta enviada!')
    window.location.reload()
  }

  return (
    <div className="customer-support-container" id='atencion'>
      <div className="customer-support--form-box">
        <h2>Atención al Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-primera-parte'>
            <div>
              <p className="etiqueta">Nombre y Apellido</p>
              <input type="text" placeholder="Juan Perez" id='nombre' required onChange={handleInputChange} />
              <p className="etiqueta">DNI</p>
              <input type="number" placeholder="Escribí tu DNI sin puntos" id='dni' required onChange={handleInputChange} />
            </div>
            <div>
              <p className="etiqueta">Teléfono</p>
              <input type="number" placeholder="54-3804-123456" id='telefono' required onChange={handleInputChange} />
              <p className="etiqueta">email electrónico</p>
              <input type="email" placeholder="juanperez@gmai.com" id='email' required onChange={handleInputChange} />
            </div>
          </div>
          <p className="etiqueta"> Motivo</p>
          <select required onChange={handleInputChange} id='motivo' defaultValue={'x'}>
            <option value="x" disabled>
              Selecciona tu motivo
            </option>
            <option value="consulta">Consulta</option>
            <option value="reclamo">Reclamo</option>
            <option value="sugerencia">Sugerencia</option>
          </select>
          <p className="etiqueta">Descripcion</p>
          <textarea placeholder={`Escribe el motivo de tu ${formAtencion.motivo}`} rows="5" required onChange={handleInputChange} id='descripcion'></textarea>
          <p className="etiqueta"></p>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}