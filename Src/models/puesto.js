const mongoose = require('mongoose');

const puestoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Puesto', puestoSchema);
