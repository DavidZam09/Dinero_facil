const express = require('express');
const app = express();
const Auth_cliente = require('./Auth_cliente');
var clientes = require('./Controller_cliente');
var User = require('../Usuarios/Controller_usuario');
const Val  = require('./Validator_cliente');
const Upload_files = require('../../Helpers/Upload_files');

/////////////////////////////////////////////////////////////////// Rutas de los clientes //////////////////////////////////////////////////////////////////
//rutas clientes
app.get('/clientes/lista_cliente_tipos', clientes.lista_cliente_tipos);
app.get('/clientes/registrar_cliente', Val.registrar_cliente, clientes.registrar_cliente);
app.post('/clientes/login_cliente', Val.login_cliente, clientes.login_cliente);

//rutas cliente_info
app.get('/cliente_info/dptxciudades', clientes.dptxciudades);
app.get('/cliente_info/lista_actividad_eco', clientes.lista_actividad_eco);
app.get('/cliente_info/lista_sector_eco', clientes.lista_sector_eco);
app.get('/cliente_info/lista_cliente_infoxcliente', Val.lista_cliente_infoxcliente, clientes.lista_cliente_infoxcliente);
app.post('/cliente_info/input_cliente_info', 
    Upload_files.files_save, 
    Val.input_cliente_info,
    clientes.input_cliente_info
);
app.get('/documento/get_doc', clientes.get_doc);
app.get('/cliente/lista_tipo_doc', User.lista_tipo_doc);
app.get('/cliente/lista_config', User.lista_config);

//recupera pass
app.get('/clientes/val_correo_cliente', Val.val_correo_cliente, clientes.val_correo_cliente);
app.post('/clientes/cambio_pass', Val.cambio_pass, clientes.cambio_pass);

/////////////////////////////////////////////////////////////////// Servicios de los Admin //////////////////////////////////////////////////////////////////
app.get('/admin/cliente/lista_clientesxadmin', Val.lista_clientesxadmin, clientes.lista_clientesxadmin);
app.post('/admin/cliente/update_aprobacion_cliente', Val.update_aprobacion_cliente, clientes.update_aprobacion_cliente);


module.exports = app;

