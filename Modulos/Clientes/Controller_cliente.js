const { validationResult } = require("express-validator");
var fs = require("fs");
const Cliente = require("./Services_cliente");

module.exports = {
    dptxciudades,
    lista_cliente_tipos,
    registrar_cliente
    
};

function dptxciudades(req, res, next) {
    fs.readFile(__dirname + "/dpt_y_ciudades.json", 'utf8', function (err, data) {
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.end( data );
    });
}

function lista_cliente_tipos(req, res, next) {
    Cliente.lista_cliente_tipos().then((respuerta) => {
        return res.send(respuerta);
    });
}

function registrar_cliente(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.registrar_cliente(req.query).then((respuerta) => {
        return res.send(respuerta);
    });
}

/*
function lista_roles(req, res, next) {
    Usuario.lista_roles().then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_tipo_doc(req, res, next) {
    Usuario.lista_tipo_doc().then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_users(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Usuario.lista_users(req.query.id).then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_usersxrol(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Usuario.lista_usersxrol(req.query.id).then((respuerta) => {
        return res.send(respuerta);
    });
}

function input_user(req, res, next) {
    if (req.body.id === "" || req.body.id === null) {
        return Usuario.create_user(req.body).then((respuerta) => {
            return res.send(respuerta);
        });
    } else {
        return Usuario.update_user(req.body).then((respuerta) => {
            return res.send(respuerta);
        });
    }
}

function login_user(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Usuario.login_user(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}
*/
