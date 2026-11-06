import { supabase } from '../lib/supabase.js'

export function comprimirImagen(archivo) {
  return new Promise((resolve, reject) => {
    const imagen = new Image()
    const url = URL.createObjectURL(archivo)

    imagen.onload = () => {
      const canvas = document.createElement('canvas')

      const escala = Math.min(1, 1000 / Math.max(imagen.width, imagen.height))

      canvas.width = Math.round(imagen.width * escala)
      canvas.height = Math.round(imagen.height * escala)

      const contexto = canvas.getContext('2d')

      contexto.drawImage(imagen, 0, 0, canvas.width, canvas.height)

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url)

        if (!blob) {
          reject(new Error('No se pudo comprimir la imagen'))
          return
        }

        resolve(blob)
      }, 'image/jpeg', 0.7)
    }

    imagen.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('No se pudo abrir la imagen'))
    }

    imagen.src = url
  })
}

export async function subirComprobante(archivo) {
  const { data: usuarioData, error: errorUsuario } =
    await supabase.auth.getUser()

  if (errorUsuario) throw errorUsuario

  const usuario = usuarioData.user

  if (!usuario) {
    throw new Error('No hay un usuario autenticado')
  }

  const imagenComprimida = await comprimirImagen(archivo)

  const nombreArchivo = `${crypto.randomUUID()}.jpg`
  const ruta = `${usuario.id}/${nombreArchivo}`

  const { error } = await supabase.storage
    .from('comprobantes')
    .upload(ruta, imagenComprimida, {
      contentType: 'image/jpeg'
    })

  if (error) throw error

  return ruta
}

export async function obtenerUrlComprobante(ruta) {
  const { data, error } = await supabase.storage
    .from('comprobantes')
    .createSignedUrl(ruta, 60)

  if (error) throw error

  return data.signedUrl
}