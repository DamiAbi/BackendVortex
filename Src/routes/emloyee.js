const express = require('express');
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeecontroller');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas de empleados
router.get('/', authMiddleware, getEmployees);
router.get('/:id', authMiddleware, getEmployeeById);
router.post('/', authMiddleware, adminOnly, createEmployee);
router.put('/:id', authMiddleware, adminOnly, updateEmployee);
router.delete('/:id', authMiddleware, adminOnly, deleteEmployee);

module.exports = router;
