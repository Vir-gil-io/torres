const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.post('/', productoController.crearProducto); // Ruta: /api/productos
router.get('/', productoController.obtenerProductos); // Ruta: /api/productos

module.exports = router;