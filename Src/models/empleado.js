const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  puesto: { type: mongoose.Schema.Types.ObjectId, ref: 'Puesto' },
  fechaContratacion: { type: Date, default: Date.now },
  salario: { type: Number, required: true }
});

module.exports = mongoose.model('Empleado', empleadoSchema);
