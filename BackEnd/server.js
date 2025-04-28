const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Inicializar app
const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Importar rutas
const empleadoRoutes = require('./app/routes/empleadoRoutes');
const productoRoutes = require('./app/routes/productoRoutes');
const solicitudRoutes = require('./app/routes/solicitudRoutes');
const departamentoRoutes = require('./app/routes/departamentoRoutes');

// Definir rutas
// server.js (corregido)
app.use('/api/empleados', empleadoRoutes); // Base: /api/empleados (minúscula)
app.use('/api/productos', productoRoutes); // Base: /api/productos (minúscula)
app.use('/api/solicitudes', solicitudRoutes); // Base: /api/solicitudes (minúscula)
app.use('/api/departamentos', departamentoRoutes);


app.get('/', (req, res) => {
    res.send({ data: 'Hola buenas tardes profesor Torres 🚀' });
});

// Servidor en puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
