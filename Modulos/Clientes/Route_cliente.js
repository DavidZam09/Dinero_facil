const express = require('express');
const app = express();
//const Auth_user = require('./Auth_usuario');
var clientes = require('./Controller_cliente');
const Val  = require('./Validator_cliente');


app.get('/cliente/clientes/dptxciudades', clientes.dptxciudades);
app.get('/cliente/clientes/lista_cliente_tipos', clientes.lista_cliente_tipos);
app.get('/cliente/clientes/registrar_cliente', Val.registrar_cliente, clientes.registrar_cliente);

module.exports = app;

