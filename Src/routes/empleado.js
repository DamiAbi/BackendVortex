const express = require('express');
const { listarEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado } = require('../controllers/empleadoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/empleados', authMiddleware, listarEmpleados);
router.post('/empleados', authMiddleware, crearEmpleado);
router.put('/empleados/:id', authMiddleware, actualizarEmpleado);
router.delete('/empleados/:id', authMiddleware, eliminarEmpleado);

module.exports = router;
