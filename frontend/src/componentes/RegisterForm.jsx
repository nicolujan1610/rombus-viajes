import { useEffect, useState } from "react";
import "../estilos/RegisterForm.css";
import { useNavigate } from 'react-router-dom'


export default function RegisterForm() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fecha_nacimiento: '',
    email: '',
    password: ''
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

    console.log('Realizando consulta...')
    const consulta = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const res = await consulta.json()
    if (res.response == 'ok') {
      setTimeout(() => {
        alert('Registrado Correctamente!')
        navigate('/')
      }, [1500])
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" id="nombre" required onChange={handleInputChange} />
          <input type="text" placeholder="Apellido" id="apellido" required onChange={handleInputChange} />
          <input type="number" id="dni" placeholder="Número de Documento" required onChange={handleInputChange} />
          <input type="date" id="fecha_nacimiento" required onChange={handleInputChange} />
          <input type="email" id="email" placeholder="Correo Electrónico" required onChange={handleInputChange} />
          <input type="password" id="password" placeholder="Contraseña" required onChange={handleInputChange} />
          <button type="submit">Registrar</button>

        </form>
        <a href="/" className="switch-to-login-link">
          Ya tengo una cuenta
        </a>
      </div>
    </div>
  );
}