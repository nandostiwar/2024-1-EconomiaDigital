const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const PaisModel = require('./models/Pais');
const ReservaModel = require('./models/Reserva');

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://heracots:Ioo6i66o52@heracots.iqu1wxf.mongodb.net/Pruebas?retryWrites=true&w=majority"
);

app.get("/getUsers", async (req, res) => {
    try {
      const users = await UserModel.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error al buscar usuarios" });
    }
  });

// app.get("/getUsers", (req, res) => {
//   UserModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

// Ruta para obtener todos los países
app.get('/getPaises', async (req, res) => {
    try {
      const paises = await PaisModel.find({});
      res.json(paises);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar países' });
    }
  });

  app.post("/createReserva", async (req, res) => {
    const reserva = req.body;
    const newReserva = new ReservaModel(reserva);
    await newReserva.save();
  
    res.json(reserva);
  });

  // Ruta para obtener todos los países
app.get('/getReservas', async (req, res) => {
    try {
      const reservas = await ReservaModel.find({});
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: 'No se encontró la reserva' });
    }
  });

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});