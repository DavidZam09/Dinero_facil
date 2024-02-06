const express = require('express');
const app = express();
const Auth_user = require('./Auth_usuario');
var User = require('./Controller_usuario');
const Val  = require('./Validator_usuario');

app.get('/admin/usuarios/lista_roles', Auth_user, User.lista_roles);
app.get('/admin/usuarios/lista_tipo_doc', Auth_user, User.lista_roles);
app.get('/admin/usuarios/lista_users', Auth_user, Val.lista_users, User.lista_users);
app.get('/admin/usuarios/lista_usersxrol', Auth_user, Val.lista_usersxrol, User.lista_usersxrol);
app.post('/admin/usuarios/input_user', Auth_user, Val.input_user, User.input_user);
app.post('/admin/usuarios/login_user', Val.login_user, User.login_user);

module.exports = app;

