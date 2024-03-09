const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/calculadora.routes.js');
const cors = require('cors');

const app = express();

app.use(urlencoded({extended: true}));
app.use(json());
app.use(cors());

app.use('/v1/calculadora', router);

app.listen(3500, ()=>{
    console.log("Listening at port 3500");
})