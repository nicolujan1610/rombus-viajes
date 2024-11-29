import { useEffect, useState } from 'react';
import '../estilos/PisoAsiento.css'

export default function PisoAsiento({ setAsientoConfirmado, asientoSelected, setAsientoSelected, asientosDisponibles }) {
  const [pisoArribaSelected, setPisoArribaSelected] = useState(true)

  const cantidadAsientosArribaIzq = Array.from({ length: 20 }, (_, i) => i + 1);
  const cantidadAsientosArribaDer = Array.from({ length: 16 }, (_, i) => i + 1);
  const cantidadAsientosAbajoIzq = Array.from({ length: 8 }, (_, i) => i + 1);
  const cantidadAsientosAbajoDer = Array.from({ length: 6 }, (_, i) => i + 1);
  const [asientosOcupados, setAsientosOcupados] = useState([])

  useEffect(() => {
    let ocupados = []
    if (asientosDisponibles) {

      for (let i = 1; i <= 50; i++) {
        if (!asientosDisponibles.includes(i)) {
          ocupados.push(i)
        }
      }
    }
    setAsientosOcupados(ocupados)

  }, [asientosDisponibles])

  const handleAsientoSelected = (e) => {
    if (e.target.innerText == 'Ocupado') {
      return
    }
    if (asientoSelected == e.target.innerText) {
      setAsientoSelected(-1)
    } else {
      setAsientoSelected(e.target.innerText)
    }
  }

  const handleConfirmarAsiento = (e) => {
    if (asientoSelected > 0) {
      setAsientoConfirmado(true)
    } else {
      alert('Seleccione un asiento!')
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
      <div className='seleccionar-asiento-screen'
        style={{ display: `${pisoArribaSelected ? 'flex' : 'none'}` }}>
        <div className='asientos-arriba-izq--container'>
          {
            cantidadAsientosArribaIzq.map(asiento => (
              <div key={asiento} className={asientoSelected == asiento ? 'asiento-seleccionado asiento-izq' : 'asiento-izq'} onClick={handleAsientoSelected}>{asientosOcupados.includes(asiento) ? 'Ocupado' : asiento}</div>
            ))
          }
        </div>
        <div className='asientos-arriba-der--container'>
          {
            cantidadAsientosArribaDer.map(asiento => (
              <div key={asiento} className={asientoSelected == asiento + 20 ? `asiento-seleccionado asiento-der asiento-${asiento}` : `asiento-der asiento-${asiento}`} onClick={handleAsientoSelected}>{asientosOcupados.includes(asiento + 20) ? 'Ocupado' : asiento + 20}</div>
            ))
          }
        </div>
      </div>
      {/* Piso de abajo */}
      <div className='seleccionar-asiento-screen seleccionar-asiento-abajo-screen'
        style={{ display: `${pisoArribaSelected ? 'none' : 'flex'}` }}
      >
        <div className='asientos-abajo-izq--container'>
          {
            cantidadAsientosAbajoIzq.map(asiento => (
              <div key={asiento + 36} className={asientoSelected == asiento + 36 ? 'asiento-seleccionado asiento-izq' : 'asiento-izq'} onClick={handleAsientoSelected}>{asientosOcupados.includes(asiento) ? 'Ocupado' : asiento + 36}</div>
            ))
          }
        </div>
        <div className='asientos-abajo-der--container'>
          {
            cantidadAsientosAbajoDer.map(asiento => (
              <div key={asiento + 44} className={asientoSelected == asiento + 44 ? 'asiento-seleccionado asiento-der asiento-abajo-der' : 'asiento-der asiento-abajo-der'} onClick={handleAsientoSelected}>{asientosOcupados.includes(asiento) ? 'Ocupado' : asiento + 44}</div>
            ))
          }
        </div>

      </div>
      <button className='confirmar-asiento--button' onClick={handleConfirmarAsiento}>Confirmar Asiento</button>
    </div>
  )
}