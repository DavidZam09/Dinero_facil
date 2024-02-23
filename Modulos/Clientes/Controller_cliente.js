const { validationResult } = require("express-validator");
var fs = require("fs");
const Cliente = require("./Services_cliente");

module.exports = {
    dptxciudades,
    lista_cliente_tipos,
    registrar_cliente,
    login_cliente,
    lista_actividad_eco,
    lista_sector_eco,
    lista_cliente_infoxcliente,
    input_cliente_info
    
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

function login_cliente(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.login_cliente(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_actividad_eco(req, res, next) {
    Cliente.lista_actividad_eco().then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_sector_eco(req, res, next) {
    Cliente.lista_sector_eco().then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_cliente_infoxcliente(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.lista_cliente_infoxcliente(req.query.id).then((respuerta) => {
        return res.send(respuerta);
    });
}


async  function input_cliente_info(req, res, next) {

    if (req.body.id === "" || req.body.id === null) {
        return Cliente.create_cliente_info(req).then((respuerta) => {
            return res.send(respuerta);
        });
    } else {
        return Cliente.update_cliente_info(req).then((respuerta) => {
            return res.send(respuerta);
        });
    }
}
