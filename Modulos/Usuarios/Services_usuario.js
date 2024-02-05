const { validationResult } = require('express-validator');
const { QueryTypes } = require('sequelize');
const Rol = require('./Model_rol');
const Tipo_doc = require('./Model_tipo_doc');
const User = require('./Model_usuario');

module.exports = {
    lista_roles,
    lista_tipo_doc,
    lista_users
};

async function lista_roles(req, res, next) {
    Rol.findAll()
    .then( (respuerta)=> {
        res.json({ successful: true, data: respuerta.map(rol => rol.toJSON()) });
    });
}

async function lista_tipo_doc(req, res, next) {
    Tipo_doc.findAll()
    .then( (respuerta)=> {
        res.json({ successful: true, data: respuerta.map(tipo => tipo.toJSON()) });
    });
}

async function lista_users(req, res, next) {
    //var where = `where u.correo = '${data.correo}'`;
    var select = `SELECT u.*, r.nombre_rol, tp.nombre_tipo_doc FROM users u 
    inner join user_rols r on r.id = u.id_user_rol
    inner join user_tipo_docs as tp on tp.id = u.id_user_tipo_doc`;
    var data = await User.sequelize.query(select, { type: QueryTypes.SELECT });
    res.json({ successful: true, data: data });
}

