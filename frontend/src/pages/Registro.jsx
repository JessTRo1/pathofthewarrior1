import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Registro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Error al registrarse');
      }
      
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="container registro">
      <h2 className="registro__titulo">Crear cuenta</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Contraseña:
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button className="btn" type="submit">Registrarse</button>
      </form>

      <p className="text-muted">
        ¿Ya tienes cuenta? <Link to="/login" className="btn btn--enlace">Inicia sesión</Link>
      </p>
    </div>
  );
}
