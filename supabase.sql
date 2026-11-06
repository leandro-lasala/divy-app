-- ***************Tabla de gastos
CREATE TABLE public.gastos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES auth.users(id),
  descripcion text NOT NULL,
  monto numeric(12,2) NOT NULL CHECK (monto > 0),
  categoria text,
  creado_en timestamptz NOT NULL DEFAULT now(),
  imagen_ruta text
);

--***************** Activar seguridad por filas
ALTER TABLE public.gastos ENABLE ROW LEVEL SECURITY;

-- *****************Políticas de gastos
CREATE POLICY "Usuarios pueden ver sus gastos"
ON public.gastos
FOR SELECT TO authenticated
USING (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden crear sus gastos"
ON public.gastos
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden modificar sus gastos"
ON public.gastos
FOR UPDATE TO authenticated
USING (auth.uid() = usuario_id)
WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden eliminar sus gastos"
ON public.gastos
FOR DELETE TO authenticated
USING (auth.uid() = usuario_id);

GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.gastos TO authenticated;

-- ***************** Crear bucket privado para comprobantes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'comprobantes',
  'comprobantes',
  false,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- ***************** Permitir subir comprobantes a la carpeta propia
CREATE POLICY "Subir comprobantes propios"
ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'comprobantes'
  AND (storage.foldername(name))[1] = (SELECT auth.uid()::text)
);

-- ***************** Permitir consultar comprobantes de la carpeta propia
CREATE POLICY "Ver comprobantes propios"
ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'comprobantes'
  AND (storage.foldername(name))[1] = (SELECT auth.uid()::text)
);