const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const User = require('../models/User');
const Rutina = require('../models/Rutina');

// Marcar o desmarcar rutina como hecha
router.post('/rutinas-hechas/:rutinaId', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const { rutinaId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const yaHecha = user.rutinasHechas.includes(rutinaId);

    if (yaHecha) {
      user.rutinasHechas.pull(rutinaId);
    } else {
      user.rutinasHechas.push(rutinaId);
    }

    await user.save();

    res.json({
      msg: yaHecha ? 'Rutina desmarcada' : 'Rutina marcada como hecha',
      rutinasHechas: user.rutinasHechas
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar rutinas hechas', error });
  }
});

// Obtener todas las rutinas hechas
router.get('/rutinas-hechas', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('rutinasHechas');
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    res.json(user.rutinasHechas);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener rutinas', error });
  }
});

// Obtener ranking de usuarios por rutinas completadas
router.get('/ranking', async (req, res) => {
  try {
    const users = await User.find()
      .select('name avatar rutinasHechas') 
      .populate('rutinasHechas');

    const ranking = users
      .map(user => ({
        name: user.name,
        avatar: user.avatar || '',
        rutinasCompletadas: user.rutinasHechas.length
      }))
      .sort((a, b) => b.rutinasCompletadas - a.rutinasCompletadas);

    res.json(ranking);
  } catch (error) {
    console.error('Error en ranking:', error);
    res.status(500).json({ msg: 'Error al obtener ranking' });
  }
});

// Actualizar avatar de usuario
router.put('/avatar', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );
    res.json({ msg: 'Avatar actualizado', user });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar avatar', error });
  }
});


module.exports = router;
