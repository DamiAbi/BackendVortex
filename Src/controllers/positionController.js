const Position = require('../models/position');

exports.getAllPositions = async (req, res, next) => {
  try {
    const positions = await Position.find();
    res.json(positions);
  } catch (error) {
    next(error);
  }
};

exports.createPosition = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Validación básica
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newPosition = new Position({
      title,
      description,
    });

    await newPosition.save();
    res.status(201).json({ message: 'Position created successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deletePosition = async (req, res, next) => {
  try {
    const { id } = req.params;

    const position = await Position.findById(id);
    if (!position) {
      return res.status(404).json({ message: 'Position not found' });
    }

    await Position.findByIdAndDelete(id);
    res.json({ message: 'Position deleted successfully' });
  } catch (error) {
    next(error);
  }
};
