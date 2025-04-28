const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

router.post('/', empleadoController.crearEmpleado); // Ruta: /api/empleados
router.get('/', empleadoController.obtenerEmpleados); // Ruta: /api/empleados

module.exports = router;