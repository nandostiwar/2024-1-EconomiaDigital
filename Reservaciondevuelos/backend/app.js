const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      swagger: "1.0",
      version: "1.0.0",
      title: "Flights API",
      description: "Flights API Information",
      contact: {
        name: "Pranav Karmarkar",
      },
      servers: ["http://localhost:" + process.env.PORT],
    },
  },
  // ['.routes/*.js']
  apis: ["./routes/flights.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const flightsRouter = require("./routers/flights");
const countriesRouter = require('./routers/countries');


app.use("/flights", flightsRouter);
app.use('/countries', countriesRouter);

const Countries = require('./models/Countries');

// Verificar si los países se cargan correctamente
Countries.find()
  .then(countries => {
    console.log('Países cargados correctamente:', countries);
  })
  .catch(error => {
    console.error('Error al cargar países:', error);
  });

module.exports = app;