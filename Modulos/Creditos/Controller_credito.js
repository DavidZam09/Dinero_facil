const { validationResult } = require("express-validator");
const Creditos = require("./Services_credito");

module.exports = {
    lista_bancos,
    lista_credito_estados,
    input_credito,
    lista_credito_cotizacion,
    cotizacion_credito,
    input_credito_cotizacion
};

function lista_bancos(req, res, next) {
    Creditos.lista_bancos().then((respuerta) => {
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

function input_credito_cotizacion(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Creditos.input_credito_cotizacion( req.body ).then((respuerta) => {
        return res.send(respuerta);
    });
}
