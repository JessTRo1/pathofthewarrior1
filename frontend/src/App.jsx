import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Rutinas from './pages/Rutinas';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Perfil from './pages/Perfil';
import RutinaDetalle from './pages/RutinaDetalle';
import Registro from './pages/Registro';
import CrearRutina from './pages/CrearRutina';
import EditarRutina from './pages/EditarRutina';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <div className="layout"> 
        <Navbar />
        <main className="layout__main"> 
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/rutinas"
              element={
                <PrivateRoute>
                  <Rutinas />
                </PrivateRoute>
              }
            />
            <Route
              path="/rutinas/crear"
              element={
                <PrivateRoute>
                  <CrearRutina />
                </PrivateRoute>
              }
            />
            <Route
              path="/rutinas/:id"
              element={
                <PrivateRoute>
                  <RutinaDetalle />
                </PrivateRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <Perfil />
                </PrivateRoute>
              }
            />
            <Route
              path="/rutinas/:id/editar"
              element={
                <PrivateRoute>
                  <EditarRutina />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
