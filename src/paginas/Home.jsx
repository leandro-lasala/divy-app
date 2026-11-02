import "./Home.css";

function Home() {
  return (
    <main className="home">
      <header className="home-header">
        <div className="home-iconos">
          <button type="button" aria-label="Buscar">
            ⌕
          </button>
          <button type="button" aria-label="Agregar">
            +
          </button>
        </div>

        <h1>Hola, Mica!</h1>
        <p>Acá tenés un resumen de tu cuenta:</p>
      </header>

      <section className="home-saldos">
        <div className="home-tarjeta home-debes">
          <span>Debés</span>
          <strong>$15.540,00</strong>
        </div>

        <div className="home-tarjeta home-te-deben">
          <span>Te deben</span>
          <strong>$20.700,00</strong>
        </div>
      </section>

      <section className="home-acciones">
        <div className="home-botones">
          <button type="button">Visitar Grupos</button>
          <button type="button">Agregar Gasto</button>
        </div>

        <button type="button" className="home-recordatorio">
          <span>Enviar recordatorio a amigo</span>

          <img src="/Vector.svg" alt="" className="home-campana" />
        </button>
      </section>

      
<section className="home-amigos">
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
      <strong className="home-deuda">
        Debes $2.500,00
      </strong>
    </div>

    <div className="home-amigo">
      <div className="home-amigo-info">
        <img src="/public/Manuel.png" alt="" />
        <span>Manuel</span>
      </div>
      <strong className="home-cobro">
        Te debe $2.500,00
      </strong>
    </div>

    <div className="home-amigo">
      <div className="home-amigo-info">
        <img src="/public/Fatima.png" alt="" />
        <span>Fátima</span>
      </div>
      <strong className="home-cobro">
        Te debe $2.500,00
      </strong>
    </div>
     <div className="home-amigo">
      <div className="home-amigo-info">
        <img src="/public/Fatima.png" alt="" />
        <span>Fátima</span>
      </div>
      <strong className="home-cobro">
        Te debe $2.500,00
      </strong>
    </div>
    
     <div className="home-amigo">
      <div className="home-amigo-info">
        <img src="/public/Fatima.png" alt="" />
        <span>Fátima</span>
      </div>
      <strong className="home-cobro">
        Te debe $2.500,00
      </strong>
    </div>

    <div className="espacio"></div>
  </div>
</section>

<button type="button" className="home-anadir-amigo">
  <span className="home-anadir-icono">+</span>
  Añadir Amigo
</button>


      <nav className="home-navegacion">
        <button type="button" className="nav-activo" aria-label="Inicio">
          <img src="/Home.svg" alt="" />
        </button>

        <button type="button" aria-label="Grupos">
          <img src="/Group%2025.svg" alt="" />
        </button>

        <button type="button" aria-label="Gastos">
          <img src="/Notas.svg" alt="" />
        </button>

        <button type="button" aria-label="Perfil">
          <img src="/Perfil.svg" alt="" />
        </button>
      </nav>
    </main>
  );
}

export default Home;
