const express = require('express');
const app = express();
const Auth_user = require('./Auth_usuario');
var User = require('./Controller_usuario');
const Val  = require('./Validator_usuario');

app.get('/admin/usuarios/lista_roles',  User.lista_roles);
app.get('/admin/usuarios/lista_tipo_doc',  User.lista_tipo_doc);
app.get('/admin/usuarios/lista_users',  Val.lista_users, User.lista_users);
app.get('/admin/usuarios/lista_usersxrol',  Val.lista_usersxrol, User.lista_usersxrol);
app.post('/admin/usuarios/input_user',  Val.input_user, User.input_user);
app.post('/admin/usuarios/login_user', Val.login_user, User.login_user);

app.get('/admin/lista_config', User.lista_config);

module.exports = app;

