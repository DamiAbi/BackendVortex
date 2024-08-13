const Employee = require('../models/Employee');

// Listar empleados con filtros opcionales
exports.getEmployees = async (req, res) => {
  const { position, department } = req.query;
  let query = {};

  if (position) query.position = position;
  if (department) query.department = department;

  try {
    const employees = await Employee.find(query).populate('position');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un empleado por ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('position');
    if (!employee) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo empleado
exports.createEmployee = async (req, res) => {
  const { name, position, department, startDate, salary } = req.body;

  try {
    const newEmployee = new Employee({
      name,
      position,
      department,
      startDate,
      salary
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Empleado agregado con éxito', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un empleado
exports.updateEmployee = async (req, res) => {
  const { name, position, department, startDate, salary } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, position, department, startDate, salary },
      { new: true }
    );

    if (!updatedEmployee) return res.status(404).json({ message: 'Empleado no encontrado' });

    res.json({ message: 'Empleado actualizado con éxito', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un empleado
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Empleado no encontrado' });

    res.json({ message: 'Empleado eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
