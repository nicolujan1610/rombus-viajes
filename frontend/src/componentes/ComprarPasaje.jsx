import '../estilos/ComprarPasaje.css'
import Header from '../componentes/Header.jsx'

export default function ComprarPasaje() {
  return (
    <div className="comprar-pasaje-container">
      <Header></Header>
      <h2>Seleccione su asiento</h2>
      <div className='comprar-pasaje-box'>
        <div className='piso-buttons'>

        </div>
      </div>
    </div>
  )
}