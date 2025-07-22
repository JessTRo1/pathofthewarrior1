import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div className="inicio">

      {/* IMÁGENES DE FONDO PARALLAX */}
      <div className="inicio__fondos">
        <div className="inicio__imagen fondo-1"></div>
        <div className="inicio__imagen fondo-2"></div>
        <div className="inicio__imagen fondo-3"></div>
      </div>

      {/* FRASES INSPIRADORAS */}
      <section className="inicio__frases fade-in fade-in-delay-1">
        <figure className="inicio__frase-contenedor">
          <blockquote className="inicio__frase">“Discipline is doing what needs to be done, even if you don't want to do it.”</blockquote>
          <figcaption className="inicio__autor">– David Goggins</figcaption>
        </figure>
        <figure className="inicio__frase-contenedor">
          <blockquote className="inicio__frase">“It’s not about motivation. It’s about consistency.”</blockquote>
          <figcaption className="inicio__autor">– Jocko Willink</figcaption>
        </figure>
      </section>

      {/* HERO SECTION */}
      <section className="inicio__hero fade-in fade-in-delay-2">
        <h1 className="inicio__titulo">Path of the Warrior</h1>
        <p className="inicio__subtitulo">Transform your body. Forge your will. Begin your path today.</p>
        <div className="inicio__botones">
          <Link to="/registro" className="btn">Empieza ahora</Link>
          <Link to="/rutinas" className="btn btn--secundario">Ver rutinas</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="inicio__features fade-in fade-in-delay-3">
        <div className="feature">
          <h3 className="feature__titulo">Entrenamientos adaptados</h3>
          <p className="feature__texto">Rutinas para todos los niveles, desde principiante hasta avanzado.</p>
        </div>
        <div className="feature">
          <h3 className="feature__titulo">Progreso visible</h3>
          <p className="feature__texto">Marca tus rutinas como hechas y sigue tu evolución.</p>
        </div>
        <div className="feature">
          <h3 className="feature__titulo">Inspiración constante</h3>
          <p className="feature__texto">Frases, medallas, y comunidad para mantenerte motivado.</p>
        </div>
      </section>

      {/* FOOTER */}
    </div>
  );
}
