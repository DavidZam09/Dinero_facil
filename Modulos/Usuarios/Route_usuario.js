const express = require('express');
const app = express();
var usuarios = require('./Services_usuario');
//const Validator  = require('./Validator_usuario');

app.get('/admin/usuarios/lista_roles', usuarios.lista_roles);
app.get('/admin/usuarios/lista_tipo_doc', usuarios.lista_roles);
app.get('/admin/usuarios/lista_users', usuarios.lista_users);
app.post('/admin/usuarios/input_user', usuarios.input_user);

module.exports = app;

