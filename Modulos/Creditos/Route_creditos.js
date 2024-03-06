const express = require('express');
const app = express();
//const Auth_cliente = require('./Auth_cliente');
var Creditos = require('./Controller_credito');
const Val  = require('./Validator_credito');

//rutas clientes
app.get('/creditos/lista_bancos', Creditos.lista_bancos);
app.post('/creditos/input_credito', Val.input_credito,  Creditos.input_credito);

app.get('/creditos/lista_credito_cotizacion', Creditos.lista_credito_cotizacion);
app.get('/creditos/cotizacion_credito', Val.cotizacion_credito, Creditos.cotizacion_credito);
app.post('/creditos/input_credito_cotizacion', Val.input_credito_cotizacion, Creditos.input_credito_cotizacion);

module.exports = app;

