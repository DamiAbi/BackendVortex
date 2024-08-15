const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/epleadoController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de empleados (Solo admin)
router.get('/empleados', authMiddleware, empleadoController.listarEmpleados);
router.post('/empleados', authMiddleware, empleadoController.crearEmpleado);
router.put('/empleados/:id', authMiddleware, empleadoController.actualizarEmpleado);
router.delete('/empleados/:id', authMiddleware, empleadoController.eliminarEmpleado);

module.exports = router;
