const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');

// Configurar dotenv para usar las variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();  

// Inicializar la aplicación de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/auth', require('./Src/routes/auth'));
app.use('/api', require('./Src/routes/empleado'));
app.use('/api', require('./Src/routes/puesto'));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
