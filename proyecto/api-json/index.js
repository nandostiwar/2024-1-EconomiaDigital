const express = require('express');
const {urlencoded, json} = require('express');
const routerProductos = require('./routes/productos.routes.js');
const routerUsuarios = require('./routes/users.routes.js');
const routerPedidos = require('./routes/pedidos.routes.js');
const routerVentas = require('./routes/ventas.routes.js');
const routerCocina = require('./routes/cocina.routes.js');




const cors = require('cors');

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())

app.use('/v1/usuarios', routerUsuarios);
app.use('/v1/productos', routerProductos);
app.use('/v1/pedidos', routerPedidos);
app.use('/v1/ventas', routerVentas);
app.use('/v1/cocina', routerCocina);





app.listen(4000, ()=>{
    console.log('listening at port 4000');
})