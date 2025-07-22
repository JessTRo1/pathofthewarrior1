import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import RutinaCard from '../components/RutinaCard';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [rutinasHechas, setRutinasHechas] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Obtener rutinas hechas del usuario 
        const resHechas = await fetch('http://localhost:5000/api/user/rutinas-hechas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataHechas = await resHechas.json();
        setRutinasHechas(dataHechas);

        // Obtener ranking
        const resRanking = await fetch('http://localhost:5000/api/user/ranking', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataRanking = await resRanking.json();
        setRanking(dataRanking);
      } catch (err) {
        console.error('Error al cargar datos del dashboard:', err.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="dashboard">
      <h1 className="dashboard__titulo">Bienvenido, {user?.name}</h1>

      <div className="dashboard__contenido">
        {/* Rutinas completadas */}
        <div className="dashboard__rutinas">
          <h2>Rutinas Completadas</h2>
          {rutinasHechas.length === 0 ? (
            <p className="text-muted">Aún no has hecho ninguna rutina.</p>
          ) : (
            <div className="rutinas__grid">
              {rutinasHechas.map(rutina => (
                <RutinaCard key={rutina._id} rutina={rutina} />
              ))}
            </div>
          )}
        </div>

        {/* Ranking */}
        <div className="dashboard__ranking">
          <h2>Ranking</h2>
          <ul className="ranking__lista">
            {ranking.map((user, index) => (
              <li key={index} className="ranking__item">
                <span className="ranking__posicion">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                </span>
                <img src={user.avatar || '/default-avatar.png'} alt={user.name} className="ranking__avatar" />
                <span className="ranking__nombre">{user.name}</span>
                <span className="ranking__contador">{user.rutinasCompletadas} rutinas</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
