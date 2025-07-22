const express = require('express');
const router = express.Router();

const {
  crearRutina,
  obtenerRutinas,
  obtenerRutinaPorId,
  actualizarRutina,
  eliminarRutina,
  comentarRutina,
  eliminarComentario,
  editarComentario,
} = require('../controllers/rutinaController');

const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

// Rutas de lectura (solo usuarios autenticados)
router.get('/', verifyToken, obtenerRutinas);
router.get('/:id', verifyToken, obtenerRutinaPorId);

// Comentarios (usuarios autenticados)
router.post('/:id/comentarios', verifyToken, comentarRutina);
router.delete('/:id/comentarios/:comentarioId', verifyToken, eliminarComentario);
router.put('/:id/comentarios/:comentarioId', verifyToken, editarComentario);

// Rutas de modificación de rutinas (solo admins)
router.post('/', verifyToken, isAdmin, crearRutina);
router.put('/:id', verifyToken, isAdmin, actualizarRutina);
router.delete('/:id', verifyToken, isAdmin, eliminarRutina);

module.exports = router;
