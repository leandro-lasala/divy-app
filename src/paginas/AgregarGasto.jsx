

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { crearGasto } from '../servicios/gastos.js'
import './AgregarGasto.css'

function AgregarGasto() {
  const navigate = useNavigate()

  // Estados del formulario
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState('')
  const [fecha, setFecha] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [nota, setNota] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  // Guardar el gasto en Supabase
  async function manejarGuardar(e) {
    e.preventDefault()
    setError('')

    if (!descripcion.trim() || Number(monto) <= 0) {
      setError('Ingresá un nombre y un monto válido.')
      return
    }

    setGuardando(true)

    try {
      await crearGasto(
        descripcion.trim(),
        Number(monto),
        'General'
      )

      navigate('/home')
    } catch (error) {
      console.error(error)
      setError('No se pudo guardar el gasto.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <main className="agregar-gasto">

      {/* Encabezado */}
      <header className="agregar-gasto-header">
        <button
          type="button"
          className="agregar-gasto-cancelar"
          onClick={() => navigate('/home')}
          aria-label="Cancelar"
        >
          <img src="/Iconos/cross.svg" alt="" />
        </button>

        <h1>Agregar gasto</h1>

        <button
          type="submit"
          form="formulario-gasto"
          className="agregar-gasto-confirmar"
          disabled={guardando}
          aria-label="Guardar gasto"
        >
          <img src="/Iconos/check.svg" alt="" />
        </button>
      </header>

      {/* Formulario */}
      <form
        id="formulario-gasto"
        className="agregar-gasto-formulario"
        onSubmit={manejarGuardar}
      >

        {/* Introducción */}
        <section className="agregar-gasto-intro">
          <h2>Añadí un nuevo gasto</h2>
          <p>
            Con vos y: <strong>Todos los de Drinks</strong>
          </p>
        </section>

        {/* Nombre del gasto */}
        <div className="agregar-gasto-campo">
          <img
            src="/Iconos/lista.svg"
            alt=""
            className="agregar-gasto-icono"
          />

          <input
            type="text"
            placeholder="Introduce el nombre del gasto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        {/* Monto */}
        <div className="agregar-gasto-campo agregar-gasto-monto">
          <span className="agregar-gasto-simbolo">$</span>

          <input
            type="number"
            placeholder="0,00"
            min="0.01"
            step="0.01"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
        </div>

        {/* División del gasto */}
        <button
          type="button"
          className="agregar-gasto-division"
        >
          <span>
            Pagado por vos - Dividido en partes iguales
          </span>

          <img src="/Iconos/lapiz.svg" alt="" />
        </button>

        {/* Opciones inferiores */}
        <div className="agregar-gasto-opciones">

          {/* Fecha */}
          <label className="agregar-gasto-opcion">
            <img src="/Iconos/lista 2.svg" alt="" />

            <span>Hoy</span>

            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              aria-label="Fecha del gasto"
            />
          </label>

          {/* Grupo */}
          <div className="agregar-gasto-opcion">
            <img
              src="/Iconos/Group%2025.svg"
              alt=""
              className="agregar-gasto-grupo-icono"
            />
            <span>Drinks</span>
          </div>

          {/* Nota */}
          <button
            type="button"
            className="agregar-gasto-opcion"
            onClick={() => {
              const nuevaNota = window.prompt(
                'Agregá una nota',
                nota
              )

              if (nuevaNota !== null) {
                setNota(nuevaNota)
              }
            }}
          >
            <img src="/Iconos/Note_Edit.svg" alt="" />
            <span>{nota ? 'Editar nota' : 'Nota'}</span>
          </button>

        </div>

        {/* Mensaje de error */}
        {error && (
          <p className="agregar-gasto-error">
            {error}
          </p>
        )}

      </form>
    </main>
  )
}

export default AgregarGasto
