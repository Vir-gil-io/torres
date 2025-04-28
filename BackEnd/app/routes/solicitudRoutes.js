const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');

router.post('/', solicitudController.crearSolicitud); // Ruta: /api/solicitudes
router.get('/', solicitudController.obtenerSolicitudes); // Ruta: /api/solicitudes
router.put('/:id', solicitudController.actualizarSolicitud); // Ruta: /api/solicitudes/:id
router.delete('/:id', solicitudController.eliminarSolicitud); // Ruta: /api/solicitudes/:id

module.exports = router;