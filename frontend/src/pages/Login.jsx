import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Error al iniciar sesión');
      }

      const newUser = {
        email: data.user.email,
        name: data.user.name,
        isAdmin: data.user.isAdmin || false
      };

      login(newUser, data.token);
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="container login">
      <h2 className="login__titulo">Iniciar sesión</h2>
      <form className="form-container" onSubmit={handleSubmit}>
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

        <button className="btn" type="submit">Entrar</button>
      </form>

      <p className="text-muted">
        ¿No tienes una cuenta? <Link to="/registro" className="btn btn--enlace">Regístrate</Link>
      </p>
    </div>
  );
}
