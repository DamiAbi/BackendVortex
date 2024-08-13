const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();

const app = express();

app.use(express.json());

// Conectar a MongoDB
connectDB();

// Importar rutas (asegúrate de que los nombres de archivo coincidan exactamente)
const authRoutes = require('./src/routes/Auth');         // O './src/routes/auth' si el archivo se llama 'auth.js'
const employeeRoutes = require('./src/routes/employee');
const positionRoutes = require('./src/routes/Position'); // O './src/routes/position' si el archivo se llama 'position.js'

// Usar rutas
app.use('/api/auth', authRoutes);         // Rutas de autenticación para administradores
app.use('/api/employees', employeeRoutes); // Rutas de empleados
app.use('/api/positions', positionRoutes); // Rutas de puestos

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
