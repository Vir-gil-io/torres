const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  nombre_empleado: { type: String, required: true },
  departamento: { type: String, required: true },
  area: { type: String, required: true }, // Campo faltante
  puesto: { type: String, required: true },
  RFC: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  fecha_registro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('empleados', EmpleadoSchema);