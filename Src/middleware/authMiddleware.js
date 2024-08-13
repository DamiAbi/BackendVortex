const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({ message: 'Token no válido' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

// Middleware para permitir solo a administradores
const adminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Acceso denegado' });
};

module.exports = { authMiddleware, adminOnly };
