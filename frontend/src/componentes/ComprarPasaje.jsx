import '../estilos/ComprarPasaje.css'
import Header from '../componentes/Header.jsx'
import { useState } from 'react'
import PisoAsiento from './PisoAsiento.jsx';

export default function ComprarPasaje() {
  const [asientoSelected, setAsientoSelected] = useState(-1)
  return (
    <div className="comprar-pasaje-container">
      <Header></Header>
      <div className='comprar-pasaje-box'>
        <PisoAsiento
          asientoSelected={asientoSelected}
          setAsientoSelected={setAsientoSelected}
        />
      </div>
    </div >
  )
}