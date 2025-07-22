const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares 
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/api/auth', require('./routes/authRoutes'));

// Rutas protegidas
app.use('/api/protected', require('./routes/protectedRoutes'));
app.use('/api/rutinas', require('./routes/rutinaRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Ruta de prueba
app.get('/api', (req, res) => {
  res.send('API funcionando');
});

module.exports = app;
