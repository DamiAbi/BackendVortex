const express = require('express');
const { registerUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Solo los admins pueden gestionar usuarios
router.post('/', protect, registerUser); // Registrar usuario
router.get('/', protect, getAllUsers);   // Listar todos los usuarios
router.put('/:id', protect, updateUser); // Editar usuario
router.delete('/:id', protect, deleteUser); // Dar de baja usuario

module.exports = router;
console.log()