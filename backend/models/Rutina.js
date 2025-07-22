const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    nombreUsuario: { type: String },
    texto: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

const rutinaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    imagen: { type: String },
    descripcion: { type: String },
    nivel: { type: String, enum: ['principiante', 'intermedio', 'avanzado'], default: 'principiante' },
    ejercicios: [{ type: String }],
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin que la crea
    comentarios: [comentarioSchema], // Comentarios de usuarios
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rutina', rutinaSchema);
