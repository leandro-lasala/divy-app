import { Link } from 'react-router'
import './Inicio.css'

function Inicio() {
  return (
    <main className="inicio">
      <img
        src="/LOGO.svg"
        alt="Divy"
        className="inicio-logo"
      />

      <div className="inicio-acciones">
        <Link to="/registro" className="inicio-registrarse">
          Registrate
        </Link>

        <Link to="/login" className="inicio-login">
          Iniciar Sesión
        </Link>
      </div>
    </main>
  )
}

export default Inicio