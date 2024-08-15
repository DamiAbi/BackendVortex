const express = require('express');
const router = express.Router();
const puestoController = require('../controllers/puestoController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de puestos (Solo admin)
router.get('/puestos', authMiddleware, puestoController.listarPuestos);
router.post('/puestos', authMiddleware, puestoController.crearPuesto);
router.delete('/puestos/:id', authMiddleware, puestoController.eliminarPuesto);

module.exports = router;
