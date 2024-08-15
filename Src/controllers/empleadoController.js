const Empleado = require('../models/Empleado');

exports.listarEmpleados = async (req, res, next) => {
  try {
    const empleados = await Empleado.find().populate('puesto');
    res.status(200).json(empleados);
  } catch (error) {
    next(error);
  }
};

exports.crearEmpleado = async (req, res, next) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();
    res.status(201).json(empleadoGuardado);
  } catch (error) {
    next(error);
  }
};

exports.actualizarEmpleado = async (req, res, next) => {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empleadoActualizado) {
      res.status(404);
      throw new Error('Empleado no encontrado');
    }
    res.status(200).json(empleadoActualizado);
  } catch (error) {
    next(error);
  }
};

exports.eliminarEmpleado = async (req, res, next) => {
  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleadoEliminado) {
      res.status(404);
      throw new Error('Empleado no encontrado');
    }
    res.status(200).json({ message: 'Empleado eliminado' });
  } catch (error) {
    next(error);
  }
};
