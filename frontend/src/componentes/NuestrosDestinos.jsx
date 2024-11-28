import '../estilos/NuestrosDestinos.css'
import BuenosAiresImg from '../assets/Buenos-Aires.jpg'
import Rosario from '../assets/Rosario.jpg'
import Bariloche from '../assets/Bariloche.jpg'
import Mendoza from '../assets/Mendoza.jpg'
import { useState } from 'react'

export default function NuestrosDestinos() {
  const [destinos, setDestinos] = useState([BuenosAiresImg, Rosario, Bariloche, Mendoza])
  // Solo usamos 4 destinos en el estado para que la galeria tenga solo 4 imagenes
  // Destinos: 
  // La Rioja - San Luis - Catamarca - Tucuman - Salta - Jujuy
  // Buenos Aires - Mendonza - Bariloche - Cordoba - Santa Fe (Rosario)

  return (
    <div className='nuestros-destinos-container' id='destino'>
      <div className='nuestros-destinos--title'>
        <h3>Conoce Nuestro Destinos</h3>
        <button className='destinos--ver-mas-button'>Ver Mas</button>
      </div>
      <div className='nuestros-destinos-gallery'>
        {destinos.map(destino => (
          <div className='destino-card' key={destino}>
            <img src={destino} alt={destino.match(/\/([^\/]+)\.jpg$/)[1]} />
          </div>
        ))}
      </div>
    </div>
  )
}