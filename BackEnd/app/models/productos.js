const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  descripcion: { type: String },
  categoria: { type: String },
  marca: { type: String },
  fecha_registro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('productos', ProductoSchema);