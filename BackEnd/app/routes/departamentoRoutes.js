const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');

router.post('/', departamentoController.crearDepartamento);
router.get('/', departamentoController.obtenerDepartamentos);

module.exports = router;