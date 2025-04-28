const mongoose = require('mongoose');

const ConsumibleSchema = new mongoose.Schema({
  nombre_consumible: { type: String, required: true },
  cantidad_solicitada: { type: Number, required: true }
});

const SolicitudSchema = new mongoose.Schema({
  departamento: { type: String, required: true },
  area: { type: String, required: true }, // Campo faltante
  solicitante: { type: String, required: true },
  fecha_solicitud: { type: Date, default: Date.now },
  folio: { type: Number, unique: true, required: true },
  consumibles: [ConsumibleSchema],
  estado: { type: String, enum: ['Atendida', 'En espera', 'Rechazada', 'Cancelada'], default: 'En espera' },
  fecha_ultima_modificacion: { type: Date, default: Date.now },
  atendido_por: { type: String, default: "" }, // Campo añadido
  fecha_atencion: { type: Date }, // Campo añadido
  comentario: { type: String }
});

module.exports = mongoose.model('solicitudes', SolicitudSchema);