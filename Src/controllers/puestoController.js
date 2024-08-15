const Puesto = require('../models/puesto');

// Crear un puesto (Solo admin)
exports.crearPuesto = async (req, res) => {
  try {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    const nuevoPuesto = new Puesto(req.body);
    await nuevoPuesto.save();
    res.status(201).json(nuevoPuesto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear puesto' });
  }
};

// Listar puestos (Solo admin)
exports.listarPuestos = async (req, res) => {
  try {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    const puestos = await Puesto.find();
    res.json(puestos);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar puestos' });
  }
};

// Eliminar un puesto (Solo admin)
exports.eliminarPuesto = async (req, res) => {
  try {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    await Puesto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Puesto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar puesto' });
  }
};
