const express = require('express');
const {
  getPositions,
  createPosition,
  deletePosition
} = require('../controllers/positioncontroller');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas de puestos
router.get('/', authMiddleware, getPositions);
router.post('/', authMiddleware, adminOnly, createPosition);
router.delete('/:id', authMiddleware, adminOnly, deletePosition);

module.exports = router;
