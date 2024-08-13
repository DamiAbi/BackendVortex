const express = require('express');
const { registerAdmin, loginAdmin, getAllAdmins } = require('../controllers/authController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas de autenticación
router.post('/register', authMiddleware, adminOnly, registerAdmin);
router.post('/login', loginAdmin);
router.get('/', authMiddleware, adminOnly, getAllAdmins);

module.exports = router;
