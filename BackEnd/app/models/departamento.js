const mongoose = require('mongoose');

const DepartamentoSchema = new mongoose.Schema({
  nombre_departamento: { type: String, required: true, unique: true },
  areas: [{ type: String }], // Array de strings, no de objetos
  fecha_creacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('departamentos', DepartamentoSchema);