const { validationResult } = require("express-validator");
const Creditos = require("./Services_credito");
const Controller_cliente = require("../Clientes/Controller_cliente");
const fs = require("fs");
var path = require("path");

module.exports = {
    lista_bancos,
    lista_credito_estados,
    input_credito,
    lista_credito_cotizacion,
    cotizacion_credito,
    //input_credito_cotizacion,
    lista_credito_estados_pago,
    lista_credito_pago,
    update_credito_pagoxcliente,
    un_credito
};

function lista_bancos(req, res, next) {
    Creditos.lista_bancos().then((respuerta) => {
        return res.send(respuerta);
    });
}

function un_credito(req, res, next) {
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Creditos.un_credito( req.query.id ).then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_credito_estados(req, res, next) {
    Creditos.lista_credito_estados().then((respuerta) => {
        return res.send(respuerta);
    });
}

function input_credito(req, res, next) {
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Creditos.input_credito(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_credito_cotizacion(req, res, next) {
    Creditos.lista_credito_cotizacion().then((respuerta) => {
        return res.send(respuerta);
    });
}

function cotizacion_credito(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Creditos.cotizacion_credito( req.query ).then((respuerta) => {
        return res.send(respuerta);
    });
}

/*function input_credito_cotizacion(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Creditos.input_credito_cotizacion( req.body ).then((respuerta) => {
        return res.send(respuerta);
    });
}*/

function lista_credito_estados_pago(req, res, next) {
    Creditos.lista_credito_estados_pago().then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_credito_pago(req, res, next) {
    Creditos.lista_credito_pago(req.query.id, null).then((respuerta) => {
        return res.send(respuerta);
    });
}

function update_credito_pagoxcliente(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        Controller_cliente.borrarContenidoCarpeta(req.files)
        return res.json({ successful: false, errors: errors.array() });
    }

    var array_name = [];
    //valido ext de documento
    for (const fileField in req.files) {
        //valido extenciones
        const file = req.files[fileField];
        const fileType = path.extname(file).toLowerCase();
        if (fileType !== '.pdf' && !['.jpg', '.jpeg', '.png', '.gif'].includes(fileType)) {
            Controller_cliente.borrarContenidoCarpeta(req.files);
            return res.json({ successful: false, errors: 'Los archivos deben ser imágenes (jpg, jpeg, png, gif) o PDF' });
        }

        //armo array de documentos subidos para comparar
        var name_file = path.basename(file);
        const regex = new RegExp(fileType, 'g');
        name_file = name_file.replace(regex, '');
        array_name.push(name_file);
    }
    Creditos.update_credito_pagoxcliente( req.body ).then((respuerta) => {
        return res.send(respuerta);
    });
}