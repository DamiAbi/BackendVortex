const express = require('express');
const { loginUser,forgotPassword, resetPassword} = require('../controllers/authController');
const router = express.Router();



router.post('/login', loginUser);
router.post('/olvidar-contraseña', forgotPassword);
router.post('/recuperar-contraseña/:token', resetPassword);

module.exports = router;
