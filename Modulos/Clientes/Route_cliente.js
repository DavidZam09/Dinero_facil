const express = require('express');
const app = express();
const Auth_cliente = require('./Auth_cliente');
var clientes = require('./Controller_cliente');
const Val  = require('./Validator_cliente');


app.get('/clientes/dptxciudades', Auth_cliente, clientes.dptxciudades);
app.get('/clientes/lista_cliente_tipos', Auth_cliente, clientes.lista_cliente_tipos);
app.get('/clientes/registrar_cliente', Val.registrar_cliente, clientes.registrar_cliente);
app.post('/clientes/login_cliente', Val.login_cliente, clientes.login_cliente);

module.exports = app;

