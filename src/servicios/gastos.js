
import { supabase } from '../lib/supabase.js'

export async function obtenerGastos() {
  const { data, error } = await supabase
    .from('gastos')
    .select('*')
    .order('creado_en', { ascending: false })

  if (error) {
    throw error
  }

  return data
}


// *******************crear gasto**********************

export async function crearGasto(descripcion, monto, categoria) {
  const { data: usuarioData, error: errorUsuario } =
    await supabase.auth.getUser()

  if (errorUsuario) {
    throw errorUsuario
  }

  if (!usuarioData.user) {
    throw new Error('No hay un usuario autenticado')
  }

  const { data, error } = await supabase
    .from('gastos')
    .insert({
      descripcion: descripcion,
      monto: monto,
      categoria: categoria,
      usuario_id: usuarioData.user.id
    })
    .select()

  if (error) {
    throw error
  }

  return data
}
