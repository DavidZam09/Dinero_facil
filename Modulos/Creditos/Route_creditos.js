const express = require('express');
const app = express();
//const Auth_cliente = require('./Auth_cliente');
var Creditos = require('./Controller_credito');
const Val  = require('./Validator_credito');
const Upload_files = require('../../Helpers/Upload_files');

/////////////////////////////////////////////////////////////////// Rutas de los clientes //////////////////////////////////////////////////////////////////
//rutas creditos
app.get('/creditos/lista_bancos', Creditos.lista_bancos);
app.get('/creditos/lista_credito_estados', Creditos.lista_credito_estados);
app.post('/creditos/input_credito', Val.input_credito,  Creditos.input_credito);
app.get('/creditos/un_credito', Val.un_credito, Creditos.un_credito);

//rutas creditos Pago y cotizacion creditos pago
app.get('/creditos/lista_credito_cotizacion', Creditos.lista_credito_cotizacion);
app.get('/creditos/cotizacion_credito', Val.cotizacion_credito, Creditos.cotizacion_credito);
//app.post('/creditos/input_credito_cotizacion', Val.input_credito_cotizacion, Creditos.input_credito_cotizacion);

app.get('/creditos/lista_credito_estados_pago', Creditos.lista_credito_estados_pago);
app.get('/creditos/lista_credito_pago', Creditos.lista_credito_pago);
app.post('/creditos/update_credito_pagoxcliente', 
    Upload_files.files_save, 
    Val.update_credito_pagoxcliente, 
    Creditos.update_credito_pagoxcliente
);

/////////////////////////////////////////////////////////////////// Rutas de los admin //////////////////////////////////////////////////////////////////
app.get('/admin/credito/lista_creditosxcliente', Val.lista_creditosxcliente, Creditos.lista_creditosxcliente);
app.post('/admin/credito/create_aprobacion_credito', Val.create_aprobacion_credito,  Creditos.create_aprobacion_credito);

app.get('/admin/pago_cuota/lista_pago_cuotasxuser', Val.lista_pago_cuotasxuser, Creditos.lista_pago_cuotasxuser);
app.post('/admin/pago_cuota/update_aprobacion_pago_cuotaxadmin', Val.update_aprobacion_pago_cuotaxadmin,  Creditos.update_aprobacion_pago_cuotaxadmin);

module.exports = app;

