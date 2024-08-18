const express = require('express');
const { 
    getAllPositions, 
    createPosition,
     deletePosition } = require('../controllers/positionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getAllPositions);
router.post('/', protect, createPosition);
router.delete('/:id', protect, deletePosition);

module.exports = router;
