import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Router } from 'react-router-dom';
import RouterComponet from './RouterComponent.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RouterComponet />
  </BrowserRouter>
)
