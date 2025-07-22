import { Link } from 'react-router-dom';

export default function RutinaCard({ rutina }) {
  return (
    <Link to={`/rutinas/${rutina._id}`} className="rutina-card">
      <img src={rutina.imagen} alt={rutina.titulo} className="rutina-card__imagen" />
      <div className="rutina-card__contenido">
        <h3 className="rutina-card__titulo">{rutina.titulo}</h3>
        <p className="rutina-card__nivel">{rutina.nivel}</p>
      </div>
    </Link>
  );
}