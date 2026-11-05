import { Link } from "react-router";
import "./Registro.css";
import { useState } from "react";
import { supabase } from '../lib/supabase.js';

function Registro() {

  // **********************los estados de los inputs y mensajes de error*********************

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function registrarUsuario(e) {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: nombre,
        },
      },
    });

    if (error) {
      setMensaje(error.message);
    } else if (data.session) {
      setMensaje("¡Cuenta creada correctamente!");
    } else {
      setMensaje("¡Cuenta creada! Revisá tu correo para confirmarla.");
    }

    setCargando(false);
  }

// *****************html del registro*********************

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

        <form className="registro-formulario" onSubmit={registrarUsuario}>
          <div className="registro-campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder="Mica"
              autoComplete="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={cargando}>
            {cargando ? "Creando..." : "Crear"}
          </button>

          {mensaje && <p className="registro-mensaje">{mensaje}</p>}
        </form>

        <p className="registro-login">
          Ya tenés una cuenta? <Link to="/login">INICIA SESION</Link>
        </p>
      </div>
    </main>
  );
}

export default Registro;
