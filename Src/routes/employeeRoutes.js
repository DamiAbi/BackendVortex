const express = require('express');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getAllEmployees); // Listar todos los empleados
router.get('/:id', protect, getEmployeeById); // Detalle de un empleado
router.post('/', protect, createEmployee); // Agregar un nuevo empleado
router.put('/:id', protect, updateEmployee); // Actualizar empleado
router.delete('/:id', protect, deleteEmployee); // Eliminar empleado

module.exports = router;
