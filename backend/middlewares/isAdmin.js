function isAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ msg: 'Acceso denegado: solo administradores' });
  }
  next(); // Continua si es admin
}

module.exports = isAdmin;
