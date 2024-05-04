const express = require('express'); // Importar Express para la creación del servidor
const mongoose = require('mongoose'); // Importar Mongoose para la conexión con MongoDB
const cors = require('cors'); // Importar CORS para permitir solicitudes desde diferentes dominios

const app = express(); // Inicializar la aplicación de Express
const PORT = process.env.PORT || 5000; // Definir el puerto en el que se ejecutará el servidor

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/paises', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Conexión a la base de datos establecida correctamente");
})
.catch((error) => {
  console.error("Error al conectar a la base de datos:", error);
});

app.use(express.json()); // Middleware para procesar datos en formato JSON
app.use(cors()); // Middleware para permitir solicitudes desde diferentes dominios

// Ruta para obtener la lista de países
app.get('/paises', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm; // Obtener el término de búsqueda desde la query
    // Consultar la base de datos para obtener los países que coincidan con el término de búsqueda
    const countries = await mongoose.connection.db.collection('paises').find({ name: new RegExp(searchTerm, 'i') }, { projection: { name: 1 } }).toArray();
    res.json(countries); // Enviar los países obtenidos como respuesta en formato JSON
  } catch (error) {
    console.error('Error al obtener los países:', error);
    res.status(500).json({ message: 'Error interno del servidor' }); // Enviar un mensaje de error si ocurre un problema
  }
});

// Ruta para guardar la información en la base de datos
app.post('/info', async (req, res) => {
  try {
    const { country, month, day } = req.body; // Obtener los datos del cuerpo de la solicitud
    // Insertar la información en la colección "info" de la base de datos
    await mongoose.connection.db.collection('info').insertOne({ country, month, day });
    res.status(201).json({ message: 'Información guardada correctamente en la base de datos.' }); // Enviar un mensaje de éxito
  } catch (error) {
    console.error('Error al guardar la información en la base de datos:', error);
    res.status(500).json({ message: 'Error interno del servidor' }); // Enviar un mensaje de error si ocurre un problema
  }
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
