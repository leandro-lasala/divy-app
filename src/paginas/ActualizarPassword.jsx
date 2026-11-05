
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../lib/supabase'
import './ActualizarPassword.css'

function ActualizarPassword() {
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  const navigate = useNavigate()

  async function cambiarPassword(e) {
    e.preventDefault()
    setMensaje('')
    setCargando(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        setMensaje(error.message)
      } else {
        setMensaje('¡Contraseña actualizada correctamente!')
        setTimeout(() => navigate('/login'), 2000)
      }
    } catch {
      setMensaje('No se pudo actualizar la contraseña.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="actualizar-password">
      <h1>Nueva contraseña</h1>
      <p>Ingresá tu nueva contraseña para recuperar tu cuenta.</p>

      <form onSubmit={cambiarPassword}>
        <label htmlFor="nueva-password">Nueva contraseña</label>

        <input
          id="nueva-password"
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          autoComplete="new-password"
          required
        />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Guardando...' : 'Cambiar contraseña'}
        </button>

        {mensaje && <p>{mensaje}</p>}
      </form>
    </main>
  )
}

export default ActualizarPassword