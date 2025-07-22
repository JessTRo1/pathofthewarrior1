const Rutina = require('../models/Rutina');


// Crear nueva rutina
const crearRutina = async (req, res) => {
  try {
    const { titulo, descripcion, nivel, ejercicios, imagen } = req.body;
    const autor = req.user.userId;

    const nuevaRutina = new Rutina({
      titulo,
      descripcion,
      nivel,
      ejercicios,
      imagen,
      autor
    });

    await nuevaRutina.save();
    res.status(201).json({ msg: 'Rutina creada', rutina: nuevaRutina });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear rutina', error });
  }
};


// Obtener todas las rutinas
const obtenerRutinas = async (req, res) => {
  try {
    const rutinas = await Rutina.find().populate('autor', 'email');
    res.json(rutinas);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener rutinas', error });
  }
};


// Obtener rutina por ID
const obtenerRutinaPorId = async (req, res) => {
  try {
    const rutina = await Rutina.findById(req.params.id).populate('autor', 'email');
    if (!rutina) return res.status(404).json({ msg: 'Rutina no encontrada' });

    res.json(rutina);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener rutina', error });
  }
};


// Actualizar rutina
const actualizarRutina = async (req, res) => {
  try {
    const rutina = await Rutina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rutina) return res.status(404).json({ msg: 'Rutina no encontrada' });

    res.json({ msg: 'Rutina actualizada', rutina });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar rutina', error });
  }
};


// Eliminar rutina
const eliminarRutina = async (req, res) => {
  try {
    const rutina = await Rutina.findByIdAndDelete(req.params.id);
    if (!rutina) return res.status(404).json({ msg: 'Rutina no encontrada' });

    res.json({ msg: 'Rutina eliminada' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar rutina', error });
  }
};


// Añadir comentario a rutina
const comentarRutina = async (req, res) => {
  try {
    const { texto } = req.body;
    const rutinaId = req.params.id;

    if (!texto) {
      return res.status(400).json({ msg: 'Texto requerido' });
    }

    const rutina = await Rutina.findById(rutinaId);
    if (!rutina) return res.status(404).json({ msg: 'Rutina no encontrada' });

    const nuevoComentario = {
      userId: req.user.userId,
      nombreUsuario: req.user.name || 'Anónimo',
      texto
    };

    rutina.comentarios.push(nuevoComentario);
    await rutina.save();

    res.status(201).json({ msg: 'Comentario añadido', comentario: nuevoComentario });
  } catch (error) {
    res.status(500).json({ msg: 'Error al comentar rutina', error });
  }
};


// Editar comentario
const editarComentario = async (req, res) => {
  const { id, comentarioId } = req.params;
  const { texto } = req.body;
  const userId = req.user.userId;
  const isAdmin = req.user.isAdmin;

  try {
    const rutina = await Rutina.findById(id);
    if (!rutina) return res.status(404).json({ msg: 'Rutina no encontrada' });

    const comentario = rutina.comentarios.id(comentarioId);
    if (!comentario) return res.status(404).json({ msg: 'Comentario no encontrado' });

    if (comentario.userId.toString() !== userId && !isAdmin) {
      return res.status(403).json({ msg: 'No tienes permiso para editar este comentario' });
    }

    comentario.texto = texto;
    await rutina.save();

    res.json({ msg: 'Comentario editado con éxito', comentario });
  } catch (error) {
    console.error('Error al editar comentario:', error);
    res.status(500).json({ msg: 'Error al editar comentario', error });
  }
};


// Eliminar comentario
const eliminarComentario = async (req, res) => {
  const { id, comentarioId } = req.params;
  const userId = req.user.userId;
  const isAdmin = req.user.isAdmin;

  try {
    const rutina = await Rutina.findById(id);
    if (!rutina) return res.status(404).json({ msg: 'Rutina no encontrada' });

    const comentario = rutina.comentarios.id(comentarioId);
    if (!comentario) return res.status(404).json({ msg: 'Comentario no encontrado' });

    if (comentario.userId.toString() !== userId && !isAdmin) {
      return res.status(403).json({ msg: 'No tienes permiso para eliminar este comentario' });
    }

    comentario.remove();
    await rutina.save();

    res.json({ msg: 'Comentario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ msg: 'Error al eliminar comentario', error });
  }
};


// Exportar controladores
module.exports = {
  crearRutina,
  obtenerRutinas,
  obtenerRutinaPorId,
  actualizarRutina,
  eliminarRutina,
  comentarRutina,
  editarComentario,
  eliminarComentario,
};
