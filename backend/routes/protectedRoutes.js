const express = require('express');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Ruta protegida
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    msg: 'Acceso concedido a la ruta protegida',
    user: req.user  
  });
});

module.exports = router;
