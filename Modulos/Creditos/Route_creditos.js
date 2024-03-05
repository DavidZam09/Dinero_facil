const express = require('express');
const app = express();
//const Auth_cliente = require('./Auth_cliente');
var Creditos = require('./Controller_credito');
const Val  = require('./Validator_credito');

//rutas clientes
app.get('/creditos/lista_bancos', Creditos.lista_bancos);
app.get('/creditos/lista_credito_estados', Creditos.lista_credito_estados);
app.post('/creditos/input_credito', Val.input_credito,  Creditos.input_credito);


module.exports = app;

