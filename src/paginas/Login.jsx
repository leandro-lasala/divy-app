import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import "./Login.css";

function Login() {


// ******************permisos de notificaciones*********************

  async function solicitarNotificaciones() {
    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }

  // *********************los estados de los inputs y mensajes de error*********************

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  async function iniciarSesion(e) {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log("Error de Supabase:", error);
        setMensaje(error.message);
      } else {
        navigate("/home");
      }
    } catch {
      setMensaje("No se pudo conectar con Supabase.");
    } finally {
      setCargando(false);
    }
  }

  // ********************Recuperar contraseña*********************
  async function recuperarPassword() {
    if (!email.trim()) {
      setMensaje("Primero ingresá tu email.");
      return;
    }

    setMensaje("");
    setCargando(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/actualizar-password`,
        },
      );

      if (error) {
        setMensaje(error.message);
      } else {
        setMensaje(
          "Si existe una cuenta con ese correo, recibirás un enlace para cambiar tu contraseña.",
        );
      }
    } catch {
      setMensaje("No se pudo enviar el correo de recuperación.");
    } finally {
      setCargando(false);
    }
  }

  return (
    // *********************************html del login*********************************

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

        <form className="login-formulario" onSubmit={iniciarSesion}>
          <div className="login-campo">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="tuemail@gmail.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button onClick={solicitarNotificaciones}  type="submit" disabled={cargando}>
            {cargando ? "Ingresando..." : "Iniciar Sesión"}
            
          </button>

          {mensaje && <p className="login-mensaje">{mensaje}</p>}
        </form>

        <p className="login-registro">
          ¿No tenés una cuenta? <Link to="/registro">REGISTRATE</Link>
        </p>

        <button
          type="button"
          className="login-olvide"
          onClick={recuperarPassword}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </main>
  );
}

export default Login;
