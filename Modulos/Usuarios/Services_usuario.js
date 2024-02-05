const { validationResult } = require('express-validator');
const { QueryTypes } = require('sequelize');
const Rol = require('./Model_rol');
const Tipo_doc = require('./Model_tipo_doc');
const User = require('./Model_usuario');

module.exports = {
    lista_roles,
    lista_tipo_doc,
    lista_users,
    input_user
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

async function input_user(req, res, next) {

    var data = req.body;
    
    if( (data.id === '' ) || (data.id === null) ){
        var validar1 = await User.findOne({ where: { num_celular: data.num_celular } });
        var validar2 = await User.findOne({ where: { email: data.email } });
        var validar3 = await User.findOne({ where: { num_doc: data.num_doc } });
    }else{
        var validar1 = await User.findOne({ where: { num_celular: data.num_celular, id: { [Sequelize.Op.ne]: data.id } } });
        var validar2 = await User.findOne({ where: { email: data.email, id: { [Sequelize.Op.ne]: data.id } } });
        var validar3 = await User.findOne({ where: { num_doc: data.num_doc, id: { [Sequelize.Op.ne]: data.id } } });
    }

    if (validar1 !== null) {
        return ({ successful: false, error: "Celular ya existe" });
    }
    if (validar2 !== null) {
        return ({ successful: false, error: "Correo ya existe" });
    }
    if (validar3 !== null) {
        return ({ successful: false, error: "Numero de documento ya existe" });
    }

    var obj = {
        id_user_tipo_doc: data.id_user_tipo_doc,
        id_user_rol: data.id_user_rol,
        nombre_completo: data.nombre_completo,
        email: data.email,
        num_celular: data. num_celular,
        num_doc: data. num_doc,
        direccion: data. direccion,
        activo: data. activo
    };

    if( (data.id === '' ) || (data.id === null) ){
        if( (data.password === '' ) || (data.id === password) ){
            res.json({ successful: false, data: "El campo Contraseña es requerido" });
        }
        const salt = await bcrypt.genSalt(10);
        obj.password = await bcrypt.hash(data.password, salt);
    }if ((data.password === '' ) || (data.id === password)) {
        obj.id = data.id;
    } else {
        const salt = await bcrypt.genSalt(10);
        obj.password = await bcrypt.hash(data.password, salt);
        obj.id = data.id;
    }

    try {
        var new_user = await User.create(obj);
        //lista_users();
        res.json({ successful: true, data: new_user });
    } catch (error) {
        console.log(error);
        res.json({ successful: false, data: error });
    }

}