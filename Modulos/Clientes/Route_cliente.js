const express = require('express');
const app = express();
const Auth_cliente = require('./Auth_cliente');
var clientes = require('./Controller_cliente');
const Val  = require('./Validator_cliente');
const Upload_files = require('../../Upload_files');

//rutas clientes
app.get('/clientes/lista_cliente_tipos', Auth_cliente, clientes.lista_cliente_tipos);
app.get('/clientes/registrar_cliente', Val.registrar_cliente, clientes.registrar_cliente);
app.post('/clientes/login_cliente', Val.login_cliente, clientes.login_cliente);

//rutas cliente_info
app.get('/cliente_info/dptxciudades', Auth_cliente, clientes.dptxciudades);
app.get('/cliente_info/lista_actividad_eco', clientes.lista_actividad_eco);
app.get('/cliente_info/lista_sector_eco', clientes.lista_sector_eco);
app.get('/cliente_info/lista_cliente_infoxcliente', Val.lista_cliente_infoxcliente, clientes.lista_cliente_infoxcliente);

app.post('/cliente_info/input_cliente_info', Upload_files.files_cliente_info, Val.input_cliente_info,  clientes.input_cliente_info);
module.exports = app;

