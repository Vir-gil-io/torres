const Solicitud = require('../models/solicitudes');
const Counter = require('../models/counter'); // Nuevo modelo para contador

exports.crearSolicitud = async (req, res) => {
  try {

    const empleado = await Empleado.findOne({ nombre_empleado: req.body.solicitante });
    if (!empleado) return res.status(404).json({ error: "Empleado no encontrado" });

    const counter = await Counter.findByIdAndUpdate(
      { _id: 'folio' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const solicitudData = {
      ...req.body,
      folio: counter.seq, // Asignar el folio consecutivo
      area: empleado.area 
    };

    const solicitud = new Solicitud(solicitudData);
    await solicitud.save();
    res.status(201).json(solicitud);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

exports.actualizarSolicitud = async (req, res) => {
    try {
      const solicitud = await Solicitud.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
      res.status(200).json(solicitud);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Eliminar solicitud
  exports.eliminarSolicitud = async (req, res) => {
    try {
      const solicitud = await Solicitud.findByIdAndDelete(req.params.id);
      if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
      res.status(200).json({ mensaje: 'Solicitud eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar solicitud' });
    }
  };