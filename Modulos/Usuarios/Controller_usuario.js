const Usuario = require('./Services_usuario');

module.exports = {
    lista_roles,
    lista_tipo_doc,
    lista_users,
    input_user,
    login_user
};

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
    Usuario.lista_users(req.query.id).then((respuerta) => {
        return res.send(respuerta);
    });
}

function input_user(req, res, next) {

    if( ( req.body.id === '' ) || ( req.body.id === null) ){
        return Usuario.create_user( req.body ).then((respuerta) => {
            return res.send(respuerta);
        });
    }else{
        return Usuario.update_user( req.body ).then((respuerta) => {
            return res.send(respuerta);
        });
    }
}

function login_user(req, res, next) {
    Usuario.login_user(req.query).then((respuerta) => {
        return res.send(respuerta);
    });
}