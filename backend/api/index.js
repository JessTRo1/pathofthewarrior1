const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Permite solicitudes desde tu frontend en Vercel
app.use(cors({
  origin: 'https://pathofthewarrior-frontend-dev.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo conectado'))
  .catch((err) => console.error('Error Mongo:', err));

// Rutas principales
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/protected', require('../routes/protectedRoutes'));
app.use('/api/rutinas', require('../routes/rutinaRoutes'));
app.use('/api/user', require('../routes/userRoutes'));

// Ruta de prueba
app.get('/api', (req, res) => {
  res.send('API funcionando');
});

module.exports = app;
