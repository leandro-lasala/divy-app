import { Link } from "react-router";
import "./Registro.css";

function Registro() {
  return (
    <main className="registro">
      <div className="registro-onda">
        <svg
          viewBox="0 0 390 180"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 H390 V70 C290 190 190 100 115 95 C60 90 25 125 0 165 Z"
            fill="var(--amarillo)"
          />
        </svg>
      </div>

      <div className="registro-contenido">
        <h1>Te damos la bienvenida!</h1>
        <p>Crea tu cuenta para ingresar a Divy</p>

        
<form className="registro-formulario">

  <div className="registro-campo">
    <label htmlFor="nombre">Nombre</label>
    <input
      id="nombre"
      type="text"
      placeholder="Mica"
      autoComplete="name"
      required
    />
  </div>

  <div className="registro-campo">
    <label htmlFor="email">Email</label>
    <input
      id="email"
      type="email"
      placeholder="micarollo98@gmail.com"
      autoComplete="email"
      required
    />
  </div>

  <div className="registro-campo">
    <label htmlFor="password">Contraseña</label>
    <input
      id="password"
      type="password"
      placeholder="**********"
      autoComplete="new-password"
      required
    />
  </div>

  <button type="submit">Crear</button>

</form>


        <p className="registro-login">
          Ya tenés una cuenta? <Link to="/login">INICIA SESION</Link>
        </p>
      </div>
    </main>
  );
}

export default Registro;
