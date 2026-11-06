import { useState, useEffect } from "react";
import { obtenerGastos, eliminarGasto } from "../servicios/gastos.js";

export function useGastos() {
  const [gastos, setGastos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Consultar los gastos en Supabase
  useEffect(() => {
    let activo = true;

    async function cargarGastos() {
      try {
        const datos = await obtenerGastos();

        if (activo) {
          setGastos(datos);
        }
      } catch (error) {
        console.error(error);

        if (activo) {
          setError("No se pudieron cargar los gastos.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarGastos();

    return () => {
      activo = false;
    };
  }, []);

  // Eliminar un gasto
  async function manejarEliminar(id) {
    const confirmar = window.confirm("¿Querés eliminar este gasto?");

    if (!confirmar) {
      return;
    }

    try {
      await eliminarGasto(id);

      setGastos((anteriores) =>
        anteriores.filter((gasto) => gasto.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el gasto.");
    }
  }

  // Calcular totales
  const totalGastado = gastos.reduce((total, gasto) => {
    return total + Number(gasto.monto);
  }, 0);

  const cantidadGastos = gastos.length;

  return {
    gastos,
    cargando,
    error,
    manejarEliminar,
    totalGastado,
    cantidadGastos,
  };
}