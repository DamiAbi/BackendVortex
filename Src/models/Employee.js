const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
  department: { type: String, required: true },
  startDate: { type: Date, required: true },
  salary: { type: Number, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
