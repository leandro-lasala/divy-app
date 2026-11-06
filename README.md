# Divy

Divy es una aplicación web desarrollada con React que permite registrar y administrar gastos personales de manera sencilla.

El proyecto fue realizado para el segundo parcial de la materia **Clientes Web Mobile**.

## Estado del proyecto

Divy es un proyecto que se encuentra actualmente en desarrollo, por lo que algunas secciones y funcionalidades de la interfaz todavía no están implementadas.

La aplicación cuenta con las funcionalidades principales desarrolladas para este parcial, como la autenticación de usuarios, la gestión de gastos y el almacenamiento de comprobantes.

A medida que avance el desarrollo, se incorporarán nuevas funcionalidades y podrán realizarse cambios tanto en el diseño como en el funcionamiento de la aplicación.

## Tecnologías utilizadas

- React y Vite para el desarrollo de la interfaz.
- React Router para la navegación entre pantallas.
- Supabase Authentication para el registro e inicio de sesión.
- Supabase Database para almacenar los gastos.
- Supabase Storage para guardar imágenes de comprobantes.
- JavaScript y CSS.

## Funcionalidades

- Registro de usuarios mediante correo electrónico y contraseña.
- Inicio y cierre de sesión.
- Persistencia de la sesión al recargar la página.
- Registro de gastos con descripción y monto.
- Visualización y eliminación de gastos.
- Cálculo del total gastado y cantidad de gastos.
- Adjuntar fotografías de comprobantes.
- Compresión de imágenes antes de subirlas.
- Visualización de comprobantes mediante enlaces temporales.
- Notificaciones del navegador al registrar un gasto.

## Instalación

**1. Clonar el repositorio**

```bash
git clone https://github.com/leandro-lasala/divy-app.git
cd divy-app
```

**2. Instalar las dependencias**

```bash
npm install
```

**3. Configurar las variables de entorno**

Copiar el archivo `.env.ejemplo` y crear uno nuevo llamado `.env`:

```bash
cp .env.ejemplo .env
```

En Windows PowerShell también se puede ejecutar `Copy-Item .env.ejemplo .env`.

Completarlo con los datos del proyecto de Supabase:

```env
VITE_SUPABASE_URL=URL_DEL_PROYECTO
VITE_SUPABASE_PUBLISHABLE_KEY=CLAVE_PUBLICA
```

El archivo `.env` no debe subirse al repositorio.

**4. Configurar Supabase**

- Crear un proyecto en Supabase.
- Abrir el SQL Editor.
- Ejecutar el contenido del archivo `supabase.sql`.
- Configurar Authentication para permitir el registro e inicio de sesión por correo electrónico.
- Copiar la URL y la clave pública del proyecto a `.env`.

**5. Ejecutar la aplicación**

```bash
npm run dev
```

Abrir en el navegador la dirección que indique Vite.

## Base de datos y seguridad

Divy utiliza una tabla llamada `gastos`, que almacena la descripción, el monto, la categoría, la fecha de creación, el usuario propietario y la ruta del comprobante.

La tabla tiene activada la seguridad por filas (RLS). Las políticas permiten que cada usuario consulte, cree, modifique y elimine únicamente sus propios gastos.

Los comprobantes se almacenan en un bucket privado llamado `comprobantes`. Cada imagen se guarda dentro de una carpeta identificada con el ID del usuario.

Las políticas de Storage restringen la subida y consulta de archivos a la carpeta correspondiente al usuario autenticado.

## Funcionalidad elegida: opción B (archivos)

Para el cuarto requisito del parcial elegimos la **opción B: almacenamiento de archivos**.

Al registrar un gasto, el usuario puede seleccionar una imagen como comprobante.

Antes de subirla, la aplicación utiliza Canvas para reducir sus dimensiones y comprimirla en formato JPEG. Después, la imagen se guarda en Supabase Storage y su ruta se registra en la tabla `gastos`.

Desde la pantalla principal, el usuario puede abrir el comprobante asociado a cada gasto mediante una URL temporal generada por Supabase.

## API del dispositivo: notificaciones

Divy utiliza la API de notificaciones del navegador.

Al iniciar sesión, la aplicación solicita permiso para enviar notificaciones, cuando el navegador lo permite.

Cuando el usuario registra un gasto correctamente, se muestra una notificación con la descripción y el monto registrado, siempre que haya concedido el permiso.

Si el navegador no admite esta API o el usuario rechaza el permiso, los gastos pueden seguir registrándose normalmente.

## Pruebas con dos usuarios

Para comprobar el funcionamiento de las políticas RLS se deben realizar pruebas con dos cuentas diferentes.

1. Registrar un gasto desde la primera cuenta.
2. Cerrar sesión e iniciar con la segunda cuenta.
3. Verificar que no aparezcan los gastos de la primera cuenta.
4. Crear un gasto y adjuntar un comprobante desde la segunda cuenta.
5. Volver a la primera cuenta y verificar que únicamente aparezcan sus propios datos.

## Organización del proyecto

- `src/paginas/`: pantallas de la aplicación.
- `src/hooks/`: hooks personalizados para organizar la lógica de gastos y sesiones.
- `src/servicios/`: funciones de comunicación con Supabase.
- `src/lib/supabase.js`: configuración del cliente de Supabase.
- `supabase.sql`: estructura de la base de datos y políticas de seguridad.
- `.env.ejemplo`: ejemplo de las variables de entorno necesarias.

## Integrantes y contribuciones

**Leandro Lasala**


**Fátima Funes**


**Micaela Carollo**


## Cuentas de prueba

Los mails y contraseñas de prueba se proporcionarán al docente por un medio privado, sin incluirlas en el repositorio.