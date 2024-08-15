const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas de autenticación
router.post('/login', authController.login);
router.post('/olvidar-contraseña', authController.olvidarContraseña);
router.post('/recuperar-contraseña/:token', authController.recuperarContraseña);

module.exports = router;
