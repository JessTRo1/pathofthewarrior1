const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo conectado'))
  .catch((err) => console.error('Error Mongo:', err));

// Rutas
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/protected', require('../routes/protectedRoutes'));
app.use('/api/rutinas', require('../routes/rutinaRoutes'));
app.use('/api/user', require('../routes/userRoutes'));

app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Exportar como handler (esto es clave)
module.exports = app;
