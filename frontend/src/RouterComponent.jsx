import { Routes, Route } from 'react-router-dom';
import App from './App';
import ComprarPasaje from './componentes/ComprarPasaje';

export default function RouterComponet() {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/comprar' element={<ComprarPasaje />} />
    </Routes>
  )
}