const Position = require('../models/Position');

// Listar todos los puestos
exports.getPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo puesto
exports.createPosition = async (req, res) => {
  const { title } = req.body;

  try {
    const newPosition = new Position({ title });
    await newPosition.save();
    res.status(201).json({ message: 'Puesto agregado con éxito', position: newPosition });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un puesto
exports.deletePosition = async (req, res) => {
  try {
    const deletedPosition = await Position.findByIdAndDelete(req.params.id);
    if (!deletedPosition) return res.status(404).json({ message: 'Puesto no encontrado' });

    res.json({ message: 'Puesto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
