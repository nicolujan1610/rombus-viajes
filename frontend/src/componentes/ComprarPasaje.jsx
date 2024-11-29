import '../estilos/ComprarPasaje.css'
import Header from '../componentes/Header.jsx'
import { useState } from 'react'
import PisoAsiento from './PisoAsiento.jsx';
import FormConfirmarViaje from './FormConfirmarViaje.jsx';

export default function ComprarPasaje() {
  const [asientoSelected, setAsientoSelected] = useState(-1)
  const [asientoConfirmado, setAsientoConfirmado] = useState(false)
  return (
    <div className="comprar-pasaje-container">
      <Header></Header>
      <div className='comprar-pasaje-box'>
        {
          !asientoConfirmado ?
            <PisoAsiento
              setAsientoConfirmado={setAsientoConfirmado}
              asientoSelected={asientoSelected}
              setAsientoSelected={setAsientoSelected}
            /> :
            <FormConfirmarViaje asientoSelected={asientoSelected} />
        }
      </div>
    </div >
  )
}