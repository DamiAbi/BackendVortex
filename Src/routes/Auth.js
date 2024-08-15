const express = require('express');
const { login, olvidarContraseña, recuperarContraseña } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/olvidar-contraseña', olvidarContraseña);
router.post('/recuperar-contraseña/:token', recuperarContraseña);

module.exports = router;
