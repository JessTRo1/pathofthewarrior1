import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function EditarRutina() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nivel, setNivel] = useState('principiante');
  const [imagen, setImagen] = useState('');
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const obtenerRutina = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/rutinas/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setTitulo(data.titulo);
        setDescripcion(data.descripcion);
        setNivel(data.nivel);
        setImagen(data.imagen);
        setEjercicios(data.ejercicios || []);
      } catch (err) {
        console.error('Error al cargar rutina:', err);
      }
    };

    obtenerRutina();
  }, [id, token]);

  const actualizarEjercicio = (index, value) => {
    const nuevos = [...ejercicios];
    nuevos[index] = value;
    setEjercicios(nuevos);
  };

  const añadirEjercicio = () => {
    setEjercicios([...ejercicios, '']);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result); // Base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/rutinas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, descripcion, nivel, imagen, ejercicios })
      });

      if (!res.ok) throw new Error('Error al actualizar rutina');
      alert('Rutina actualizada con éxito');
      navigate(`/rutinas/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Editar rutina</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          className="input"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          required
        />
        <textarea
          className="input"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          required
        />
        <select
          className="input"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
        >
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="input"
        />

        <h4>Ejercicios:</h4>
        {ejercicios.map((ej, idx) => (
          <input
            key={idx}
            className="input"
            value={ej}
            onChange={(e) => actualizarEjercicio(idx, e.target.value)}
            placeholder={`Ejercicio ${idx + 1}`}
            required
          />
        ))}
        <button type="button" onClick={añadirEjercicio} className="btn btn--enlace">
          + Añadir ejercicio
        </button>

        <button type="submit" className="btn">Actualizar rutina</button>
      </form>
    </div>
  );
}
