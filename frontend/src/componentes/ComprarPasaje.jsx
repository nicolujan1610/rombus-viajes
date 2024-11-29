import '../estilos/ComprarPasaje.css'
import Header from '../componentes/Header.jsx'
import { useEffect, useState } from 'react'
import PisoAsiento from './PisoAsiento.jsx';
import FormConfirmarViaje from './FormConfirmarViaje.jsx';
import { useLocation } from 'react-router-dom';

export default function ComprarPasaje() {
  const [asientoSelected, setAsientoSelected] = useState(-1)
  const [asientoConfirmado, setAsientoConfirmado] = useState(false)
  const [infoViaje, setInfoViaje] = useState(false)

  const location = useLocation();
  const [viajeId, setViajeId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('viajeId');
    setViajeId(id);
  }, [location.search]);


  useEffect(() => {
    if (viajeId >= 1) {
      const getData = async () => {
        const consulta = await fetch(`http://localhost:5000/viajes/${viajeId}`)
        const res = await consulta.json()
        console.log(res)
        setInfoViaje(res[0])
      }
      getData()
    }
  }, [viajeId])

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
              asientosDisponibles={infoViaje.asientos}
            /> :
            <FormConfirmarViaje
              asientoSelected={asientoSelected}
              viajeId={viajeId}
              infoViaje={infoViaje}
            />
        }
      </div>
    </div >
  )
}