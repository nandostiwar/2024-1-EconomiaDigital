const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Montar las rutas
app.use('/api', routes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
