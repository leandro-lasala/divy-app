
import { Link } from 'react-router'
import './Login.css'

function Login() {
  return (
    <main className="login">
      <div className="login-onda">
        <svg
          viewBox="0 0 390 180"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 H390 V70 C290 190 190 100 115 95 C60 90 25 125 0 165 Z"
            fill="var(--celeste)"
          />
        </svg>
      </div>

      <div className="login-contenido">
        <h1>Te damos la bienvenida!</h1>
        <p>Inicia sesión para ingresar a Divy</p>

        <form
          className="login-formulario"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="login-campo">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="micarollo98@gmail.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="login-campo">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              placeholder="**********"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit">Iniciar Sesión</button>
        </form>

        <p className="login-registro">
          ¿No tenés una cuenta?{' '}
          <Link to="/registro">REGISTRATE</Link>
        </p>
      </div>
    </main>
  )
}

export default Login
