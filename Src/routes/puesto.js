const express = require('express');
const { listarPuestos, crearPuesto, eliminarPuesto } = require('../controllers/puestoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/puestos', authMiddleware, listarPuestos);
router.post('/puestos', authMiddleware, crearPuesto);
router.delete('/puestos/:id', authMiddleware, eliminarPuesto);

module.exports = router;
