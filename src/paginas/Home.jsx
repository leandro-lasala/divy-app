import { obtenerUrlComprobante } from "../servicios/imagenes.js";
import { useNavigate } from "react-router";
import { useGastos } from "../hooks/useGastos.js";
import { useSesion } from "../hooks/useSesion.js";
import "./Home.css";

function Home() {
  // *****************visualizar comprobante*********************

  async function verComprobante(ruta) {
    try {
      const url = await obtenerUrlComprobante(ruta);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
      alert("No se pudo abrir el comprobante.");
    }
  }

  
  //**********router*************** */
  const navigate = useNavigate();



  ///********hooks*********/
  const {
  gastos,
  cargando,
  error,
  manejarEliminar,
  totalGastado,
  cantidadGastos,
  } = useGastos();

  const { cerrarSesion, usuario } = useSesion();
  const nombreUsuario =
    usuario?.user_metadata?.nombre ||
    usuario?.user_metadata?.name ||
    usuario?.user_metadata?.full_name ||
    "Usuario";
  


  // ******************************html de la pagina home*********************

  return (
    <main className="home">
      <button
        type="button"
        className="home-cerrar-sesion"
        onClick={cerrarSesion}
      >
        Cerrar sesión
      </button>

      <header className="home-header">
        <div className="home-iconos">
          <button type="button" aria-label="Buscar">
            ⌕
          </button>
          <button
            type="button"
            aria-label="Agregar gasto"
            onClick={() => navigate("/AgregarGasto")}
          >
            +
          </button>
        </div>

        <h1>Hola, {usuario?.user_metadata?.nombre || "usuario"}!</h1>
        <p>Acá tenés un resumen de tu cuenta:</p>
      </header>

      <section className="home-gastos">
        <div className="home-gastos-titulo">
          <div>
            <h2>Mis gastos</h2>
            <p>Últimos movimientos</p>
          </div>
          <span className="home-gastos-cantidad">{cantidadGastos}</span>
        </div>

        {cargando && <p className="home-gastos-estado">Cargando gastos...</p>}
        {error && <p className="home-gastos-estado home-gastos-error">{error}</p>}

        {!cargando && !error && gastos.length === 0 && (
          <p className="home-gastos-estado">
            Todavía no tenés gastos registrados.
          </p>
        )}

        {!cargando && !error && gastos.length > 0 && (
          <div className="home-gastos-lista">
            {gastos.map((gasto) => (
              <div className="home-gasto" key={gasto.id}>
                <div className="home-gasto-info">
                  <span className="home-gasto-icono">$</span>
                  <div>
                    <strong>{gasto.descripcion}</strong>
                    <span className="home-gasto-detalle">Gasto registrado</span>
                  </div>
                </div>

                <div className="home-gasto-acciones">
                  <strong className="home-gasto-monto">
                    ${Number(gasto.monto).toLocaleString("es-AR")}
                  </strong>

                  {gasto.imagen_ruta && (
                    <button
                      type="button"
                      className="home-gasto-comprobante"
                      onClick={() => verComprobante(gasto.imagen_ruta)}
                    >
                      Ver comprobante
                    </button>
                  )}

                  <button
                    type="button"
                    className="home-gasto-eliminar"
                    onClick={() => manejarEliminar(gasto.id)}
                    aria-label={`Eliminar ${gasto.descripcion}`}
                  >
                    <img src="/Iconos/cross.svg" alt="" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="home-saldos">
        <div className="home-tarjeta home-debes">
          <span>Total gastado</span>
          <strong>${totalGastado.toLocaleString("es-AR")}</strong>
        </div>

        <div className="home-tarjeta home-te-deben">
          <span>Cantidad de gastos</span>
          <strong>{cantidadGastos}</strong>
        </div>
      </section>

      <section className="home-acciones">
        <div className="home-botones">
          <button type="button">Visitar Grupos</button>
          <button type="button" onClick={() => navigate("/AgregarGasto")}>
            Agregar Gasto
          </button>
        </div>

        <button type="button" className="home-recordatorio">
          <span>Enviar recordatorio a amigo</span>

          <img src="/Iconos/Vector.svg" alt="" className="home-campana" />
        </button>
      </section>

      {/* <section className="home-amigos">
        <div className="home-amigos-titulo">
          <h2>Tu lista de amigos</h2>
          <span aria-hidden="true">›</span>
        </div>

        <div className="home-amigos-lista">
          <div className="home-amigo">
            <div className="home-amigo-info">
              <img src="/public/Leandro.png" alt="" />
              <span>Leandro</span>
            </div>
            <strong className="home-deuda">Debes $2.500,00</strong>
          </div>

          <div className="home-amigo">
            <div className="home-amigo-info">
              <img src="/public/Manuel.png" alt="" />
              <span>Manuel</span>
            </div>
            <strong className="home-cobro">Te debe $2.500,00</strong>
          </div>

          <div className="home-amigo">
            <div className="home-amigo-info">
              <img src="/public/Fatima.png" alt="" />
              <span>Fátima</span>
            </div>
            <strong className="home-cobro">Te debe $2.500,00</strong>
          </div>
          <div className="home-amigo">
            <div className="home-amigo-info">
              <img src="/public/Fatima.png" alt="" />
              <span>Fátima</span>
            </div>
            <strong className="home-cobro">Te debe $2.500,00</strong>
          </div>

          <div className="home-amigo">
            <div className="home-amigo-info">
              <img src="/public/Fatima.png" alt="" />
              <span>Fátima</span>
            </div>
            <strong className="home-cobro">Te debe $2.500,00</strong>
          </div>

          <div className="espacio"></div>
        </div>
      </section> */}

      <button type="button" className="home-anadir-amigo">
        <span className="home-anadir-icono">+</span>
        Añadir Amigo
      </button>

      <nav className="home-navegacion">
        <button type="button" className="nav-activo" aria-label="Inicio">
          <img src="/Iconos/Home.svg" alt="" />
        </button>

        <button type="button" aria-label="Grupos">
          <img src="/Iconos/Group%2025.svg" alt="" />
        </button>

        <button type="button" aria-label="Gastos">
          <img src="/Iconos/Notas.svg" alt="" />
        </button>

        <button type="button" aria-label="Perfil">
          <img src="/Iconos/Perfil.svg" alt="" />
        </button>
      </nav>
    </main>
  );
}

export default Home;
