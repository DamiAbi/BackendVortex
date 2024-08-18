const Employee = require('../models/employee');

exports.getAllEmployees = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, position, startDate, isActive } = req.query;
    const filter = {};

    if (position) filter.position = position;
    if (startDate) filter.startDate = startDate;
    if (isActive) filter.isActive = isActive === 'true';

    const employees = await Employee.find(filter)
      .populate('position')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Employee.countDocuments(filter);

    res.json({
      employees,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('position');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, email, position, startDate } = req.body;

    const newEmployee = new Employee({
      name,
      email,
      position,
      startDate,
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, position, startDate, isActive } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.position = position || employee.position;
    employee.startDate = startDate || employee.startDate;
    employee.isActive = isActive !== undefined ? isActive : employee.isActive;

    await employee.save();
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.isActive = false;
    await employee.save();

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    next(error);
  }
};
