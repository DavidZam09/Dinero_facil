const { QueryTypes } = require('sequelize');
const SQL = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Rol = require('./Model_rol');
const Tipo_doc = require('./Model_tipo_doc');
const User = require('./Model_usuario');
const Config = require('../Creditos/Model_config');

module.exports = {
    lista_roles,
    lista_tipo_doc,
    lista_users,
    lista_usersxrol,
    create_user,
    update_user,
    login_user,
    lista_config
};

async function lista_config() {
    return ({ successful: true, 
        data: await Config.findAll({ where: {  id: { [SQL.Op.notIn]: [5] } } })
    });
}

async function lista_roles() {
    return ({ successful: true, data: await Rol.findAll() });
}

async function lista_tipo_doc() {
    return ({ successful: true, data: await Tipo_doc.findAll() });
}

async function lista_users(id) {
    var where = '';
    if ((id === '') || (id === null)) { } else {
        var where = ` where u.id = ${id}`;
    }

    var select = `SELECT u.id, u.id_user_tipo_doc, u.id_user_rol, u.nombre_completo, u.email, u.num_celular, 
    u.num_doc, u.direccion, u.activo, u.createdAt, u.updatedAt,  r.nombre_rol, tp.nombre_tipo_doc 
    FROM users u 
    inner join user_rols r on r.id = u.id_user_rol
    inner join user_tipo_docs as tp on tp.id = u.id_user_tipo_doc ${where}`;
    var data = await User.sequelize.query(select, { type: QueryTypes.SELECT });
    return ({ successful: true, data: data });
}

async function lista_usersxrol(id) {

    var select = `SELECT u.id, u.id_user_tipo_doc, u.id_user_rol, u.nombre_completo, u.email, u.num_celular, 
    u.num_doc, u.direccion, u.activo, u.createdAt, u.updatedAt,  r.nombre_rol, tp.nombre_tipo_doc 
    FROM users u 
    inner join user_rols r on r.id = u.id_user_rol
    inner join user_tipo_docs as tp on tp.id = u.id_user_tipo_doc where u.activo = "SI" and r.id = ${id}`;
    var data = await User.sequelize.query(select, { type: QueryTypes.SELECT });
    return ({ successful: true, data: data });
}

async function create_user(data) {

    var validar1 = await User.findOne({ where: { num_celular: data.num_celular } });
    if (validar1 !== null) {
        return { successful: false, error: "Celular ya existe" };
    }

    var validar2 = await User.findOne({ where: { email: data.email } });
    if (validar2 !== null) {
        return { successful: false, error: "Correo ya existe" };
    }

    var validar3 = await User.findOne({ where: { num_doc: data.num_doc } });
    if (validar3 !== null) {
        return { successful: false, error: "Numero de documento ya existe" };
    }

    var obj = {
        id_user_tipo_doc: data.id_user_tipo_doc,
        id_user_rol: data.id_user_rol,
        nombre_completo: data.nombre_completo,
        email: data.email,
        num_celular: data.num_celular,
        num_doc: data.num_doc,
        direccion: data.direccion,
        activo: data.activo
    };

    if ((data.password === '') || (data.password === null)) {
        return { successful: false, error: "El campo Contraseña es requerido" };
    }
    const salt = await bcrypt.genSalt(process.env.SAL);
    obj.password = await bcrypt.hash(data.password, salt);

    try {
        var new_user = await User.create(obj);
        return lista_users(new_user.id);
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }

}

async function update_user(data) {
    const Op = SQL.Op;
    var user = await User.findOne({ where: { id: data.id } });
    if (user === null) {
        return { successful: false, error: "Usuario no existe" };
    }

    var validar1 = await User.findOne({ where: { num_celular: data.num_celular, id: { [Op.ne]: data.id } } });
    if (validar1 !== null) {
        return { successful: false, error: "Celular ya existe" };
    }

    var validar2 = await User.findOne({ where: { email: data.email, id: { [Op.ne]: data.id } } });
    if (validar2 !== null) {
        return { successful: false, error: "Correo ya existe" };
    }

    var validar3 = await User.findOne({ where: { num_doc: data.num_doc, id: { [Op.ne]: data.id } } });
    if (validar3 !== null) {
        return { successful: false, error: "Numero de documento ya existe" };
    }

    var obj = {
        id: data.id,
        id_user_tipo_doc: data.id_user_tipo_doc,
        id_user_rol: data.id_user_rol,
        nombre_completo: data.nombre_completo,
        email: data.email,
        num_celular: data.num_celular,
        num_doc: data.num_doc,
        direccion: data.direccion,
        activo: data.activo
    };

    if ((data.password === '') || (data.password === null)) { } else {
        const salt = await bcrypt.genSalt(process.env.SAL);
        obj.password = await bcrypt.hash(data.password, salt);
    }

    try {
        await user.update(obj);
        return await lista_users(data.id);
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }
}

async function login_user(data) {

    var select = `SELECT u.id, u.id_user_tipo_doc, u.id_user_rol, u.nombre_completo, u.email, u.num_celular, 
    u.num_doc, u.direccion, u.activo, u.createdAt, u.updatedAt,  r.nombre_rol, tp.nombre_tipo_doc, u.password 
    FROM users u 
    inner join user_rols r on r.id = u.id_user_rol
    inner join user_tipo_docs as tp on tp.id = u.id_user_tipo_doc where u.email = '${data.email}' limit 1`;

    var user = await User.sequelize.query(select, { type: QueryTypes.SELECT });
    user = user[0];

    return await bcrypt.compare(data.password, user.password).then(async (respuerta) => {
        if (respuerta) {

            var obj = {
                id: user.id,
                id_user_tipo_doc: user.id_user_tipo_doc,
                id_user_rol: user.id_user_rol,
                nombre_completo: user.nombre_completo,
                email: user.email,
                num_celular: user.num_celular,
                num_doc: user.num_doc,
                direccion: user.direccion,
                nombre_rol: user.nombre_rol,
                nombre_tipo_doc: user.nombre_tipo_doc,
                activo: user.activo,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

            var token = jwt.sign(
                obj,
                process.env.SAL_USER,
                { expiresIn: "24h", }
            );

            return {
                successful: true,
                token: token,
                user: obj
            }
        } else {
            return { successful: false, error: "password invalido" }
        }
    });

    /*return  new Promise(async function (myResolve, myReject){
        if (await bcrypt.compare(data.password, user.password)) {
            var obj ={
                id: user.id,
                id_user_tipo_doc: user.id_user_tipo_doc,
                id_user_rol: user.id_user_rol,
                nombre_completo: user.nombre_completo,
                email: user.email,
                num_celular: user.num_celular,
                num_doc: user.num_doc,
                direccion: user.direccion,
                nombre_rol: user.nombre_rol,
                nombre_tipo_doc: user.nombre_tipo_doc
            };

            myResolve({
                successful: true,
                token: await jwt.sign(
                    obj,
                    process.env.SAL_USER,
                    { expiresIn: "24h", }
                ),
                user: obj
            })
        }else {
            myResolve( { successful: false, error: "pass invalido" } )
        }
    })*/
}