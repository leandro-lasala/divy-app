
import { BrowserRouter, Routes, Route } from 'react-router'

import Inicio from './paginas/Inicio.jsx'
import Login from './paginas/Login.jsx'
import Registro from './paginas/Registro.jsx'
import Home from './paginas/Home.jsx'
import AgregarGasto from './paginas/AgregarGasto.jsx'
import ActualizarPassword from './paginas/ActualizarPassword.jsx'
import './App.css'

function App() {
  return (
    <div className="app-mobile">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/actualizar-password" element={<ActualizarPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AgregarGasto" element={<AgregarGasto />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App