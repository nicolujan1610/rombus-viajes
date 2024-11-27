import '../estilos/ServiciosOfrecidos.css'
import wifiLogo from '../assets/wifi-free.png'
import bano from '../assets/bano.png'
import acLogo from '../assets/aire-acondicionado.png'
import asiento from '../assets/asiento.png'
import pelicula from '../assets/pelicula.png'
import usb from '../assets/usb.png'

export default function ServiciosOfrecidos() {
  return (
    <div className="servicios-container" id='servicios'>
      <div className='servicios-title'>
        <p>Disfruta estos servicios durante tu viaje!</p>
      </div>
      <div className="servicios-icons">
        <div className="services-grid">
          <div className="service-card">
            <img
              src={wifiLogo}
              alt="Wi-Fi gratis"
              className="service-icon"
            />
            <p>Disfruta de conexión Wi-Fi durante tu viaje para mantenerte conectado.</p>
          </div>
          <div className="service-card">
            <img
              src={bano}
              alt="Baño"
              className="service-icon"
            />
            <p>Servicios higiénicos disponibles en todas nuestras unidades.</p>
          </div>
          <div className="service-card">
            <img
              src={acLogo}
              alt="Aire acondicionado" https
              className="service-icon"
            />
            <p>Viaja cómodamente con nuestro sistema de climatización a bordo.</p>
          </div>
          <div className="service-card">
            <img
              src={asiento}
              alt="Asientos confortables"
              className="service-icon"
            />
            <p>Relájate en asientos ergonómicos diseñados para tu comodidad.</p>
          </div>
          <div className="service-card">
            <img
              src={pelicula}
              alt="Entretenimiento"
              className="service-icon"
            />
            <p>Disfruta de películas, música y más durante tu viaje.</p>
          </div>
          <div className="service-card">
            <img
              src={usb}
              alt="Puerto USB"
              className="service-icon"
            />
            <p>Carga tus dispositivos electrónicos fácilmente a bordo.</p>
          </div>
        </div>
      </div>
    </div>
  )
}