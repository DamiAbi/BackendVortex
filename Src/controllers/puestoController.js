const Puesto = require('../models/puesto');

exports.listarPuestos = async (req, res, next) => {
  try {
    const puestos = await Puesto.find();
    res.status(200).json(puestos);
  } catch (error) {
    next(error);
  }
};

exports.crearPuesto = async (req, res, next) => {
  try {
    const nuevoPuesto = new Puesto(req.body);
    const puestoGuardado = await nuevoPuesto.save();
    res.status(201).json(puestoGuardado);
  } catch (error) {
    next(error);
  }
};

exports.eliminarPuesto = async (req, res, next) => {
  try {
    const puestoEliminado = await Puesto.findByIdAndDelete(req.params.id);
    if (!puestoEliminado) {
      res.status(404);
      throw new Error('Puesto no encontrado');
    }
    res.status(200).json({ message: 'Puesto eliminado' });
  } catch (error) {
    next(error);
  }
};
