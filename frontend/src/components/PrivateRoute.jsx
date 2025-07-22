import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Protege cualquier ruta privada
export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // Si no hay usuario logueado, redirige a /login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si hay usuario, muestra el contenido 
  return children;
}
