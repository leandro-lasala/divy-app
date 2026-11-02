
import { BrowserRouter, Routes, Route } from 'react-router'

import Inicio from './paginas/Inicio.jsx'
import Login from './paginas/Login.jsx'
import Registro from './paginas/Registro.jsx'
import Home from './paginas/Home.jsx'
import './App.css'

function App() {
  return (
    <div className="app-mobile">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App