
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

export async function crearGasto(descripcion, monto, categoria, imagenRuta = null) {
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
      imagen_ruta: imagenRuta,
      usuario_id: usuarioData.user.id
    })
    .select()

  if (error) {
    throw error
  }

  return data
}


// *************************Eliminar gasto**********************

export async function eliminarGasto(id) {
  const { error } = await supabase
    .from('gastos')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }
}