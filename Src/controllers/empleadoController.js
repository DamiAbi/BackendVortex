const Empleado = require('../models/empleado');

// Crear un empleado (Solo admin)
exports.crearEmpleado = async (req, res) => {
  try {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    const nuevoEmpleado = new Empleado(req.body);
    await nuevoEmpleado.save();
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear empleado' });
  }
};

// Listar empleados (Solo admin)
exports.listarEmpleados = async (req, res) => {
  try {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar empleados' });
  }
};

// Actualizar un empleado (Solo admin)
exports.actualizarEmpleado = async (req, res) => {
  try {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar empleado' });
  }
};

// Eliminar un empleado (Solo admin)
exports.eliminarEmpleado = async (req, res) => {
  try {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    await Empleado.findByIdAndDelete(req.params.id);
    res.json({ message: 'Empleado eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar empleado' });
  }
};
