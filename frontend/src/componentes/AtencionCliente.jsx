import { useEffect, useState } from 'react'
import '../estilos/AtencionCliente.css'

export default function AtencionCliente() {

  const [formAtencion, setFormAtencion] = useState({
    nombre: '',
    telefono: 0,
    dni: 0,
    correo: '',
    motivo: 'x',
    descripcion: ''
  })

  const handleInputChange = (e) => {
    setFormAtencion({
      ...formAtencion,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formAtencion.motivo == 'x') {
      alert('Seleccione un motivo')
      return
    }
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
              <p className="etiqueta">Correo electrónico</p>
              <input type="email" placeholder="juanperez@gmai.com" id='correo' required onChange={handleInputChange} />
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