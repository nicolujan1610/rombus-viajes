import { useState } from 'react';
import '../estilos/PisoAsiento.css'

export default function PisoAsiento({ asientoSelected, setAsientoSelected }) {
  const [pisoArribaSelected, setPisoArribaSelected] = useState(true)

  const cantidadAsientosArribaIzq = Array.from({ length: 20 }, (_, i) => i + 1);
  const cantidadAsientosArribaDer = Array.from({ length: 16 }, (_, i) => i + 1);

  const handleAsientoSelected = (e) => {
    if (asientoSelected == e.target.innerText) {
      setAsientoSelected(-1)
    } else {
      setAsientoSelected(e.target.innerText)
    }
  }

  return (
    <div className='seleccionar-asiento-container'>
      <h2>Seleccione su asiento</h2>
      <div className='pisos-button'>
        <button style={{ background: `${pisoArribaSelected ? 'green' : 'transparent'}` }} onClick={() => { setPisoArribaSelected(true) }}>Piso Arriba</button>
        <button style={{ background: `${pisoArribaSelected ? 'transparent' : 'green'}` }} onClick={() => { setPisoArribaSelected(false) }}>Piso Abajo</button>
      </div>
      {/* Piso de Arriba */}
      <div className='seleccionar-asiento-arriba-screen'
        style={{ display: `${pisoArribaSelected ? 'flex' : 'none'}` }}>
        <div className='asientos-izq--container'>
          {
            cantidadAsientosArribaIzq.map(asiento => (
              <div key={asiento} className={asientoSelected == asiento ? 'asiento-seleccionado asiento-izq' : 'asiento-izq'} onClick={handleAsientoSelected}>{asiento}</div>
            ))
          }
        </div>
        <div className='asientos-der--container'>
          {
            cantidadAsientosArribaDer.map(asiento => (
              <div key={asiento} className={asientoSelected == asiento + 20 ? `asiento-seleccionado asiento-der asiento-${asiento}` : `asiento-der asiento-${asiento}`} onClick={handleAsientoSelected}>{asiento + 20}</div>
            ))
          }
        </div>
      </div>
      <div className='seleccionar-asiento-abajo-screen'
        style={{ display: `${pisoArribaSelected ? 'none' : 'flex'}` }}
      >

      </div>

      <button className=''>Confirmar Asiento</button>
    </div>
  )
}