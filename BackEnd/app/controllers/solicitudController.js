const Solicitud = require('../models/solicitudes');
const Empleado = require('../models/empleados'); // Añadido - importando el modelo de empleado
const Counter = require('../models/counter');

exports.crearSolicitud = async (req, res) => {
  try {
    // Verificamos si ya tenemos el área en la solicitud
    if (req.body.area) {
      // Si ya tenemos el área, no necesitamos buscar el empleado
      // Incrementar el contador para el folio consecutivo
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'folio' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Crear el objeto de solicitud con los datos del body y el folio
      const solicitudData = {
        ...req.body,
        folio: counter.seq // Asignar el folio consecutivo
      };

      // Crear y guardar la nueva solicitud
      const solicitud = new Solicitud(solicitudData);
      await solicitud.save();

      res.status(201).json(solicitud);
    } else {
      // Si no tenemos el área, buscamos el empleado
      const empleado = await Empleado.findOne({ nombre_empleado: req.body.solicitante });
      
      if (!empleado) {
        return res.status(404).json({ error: "Empleado no encontrado" });
      }

      // Incrementar el contador para el folio consecutivo
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'folio' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Crear el objeto de solicitud con los datos del body y los datos adicionales
      const solicitudData = {
        ...req.body,
        folio: counter.seq, // Asignar el folio consecutivo
        area: empleado.area // Asignar el área del empleado
      };

      // Crear y guardar la nueva solicitud
      const solicitud = new Solicitud(solicitudData);
      await solicitud.save();

      res.status(201).json(solicitud);
    }
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    res.status(400).json({ error: error.message });
  }
};

// Implementaciones para las demás funciones referenciadas en las rutas
exports.obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fecha_ultima_modificacion: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!solicitud) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }
    
    res.status(200).json(solicitud);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByIdAndDelete(req.params.id);
    
    if (!solicitud) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }
    
    res.status(200).json({ message: "Solicitud eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};