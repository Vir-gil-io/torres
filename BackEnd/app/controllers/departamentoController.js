const Departamento = require('../models/departamento');

exports.crearDepartamento = async (req, res) => {
  try {
    const departamento = new Departamento(req.body);
    await departamento.save();
    res.status(201).json(departamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerDepartamentos = async (req, res) => {
  try {
    const departamentos = await Departamento.find();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener departamentos' });
  }
};