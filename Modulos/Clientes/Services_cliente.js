const { QueryTypes } = require('sequelize');
const SQL = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs');

const Clientes_tipo = require('./Model_clientes_tipo');
const Cliente = require('./Model_cliente');

const Actividad_eco = require('./Model_clientes_actividad_eco');
const Sector_eco = require('./Model_clientes_sector_eco');
const Cliente_info = require('./Model_clientes_info');

const { v4: uuidv4 } = require('uuid');

function generarCodigoUnico() {
    const uuid = uuidv4();
    const codigoAlfanumerico = uuid.replace(/-/g, '').substring(0, process.env.LOG_GUID);
    return codigoAlfanumerico;
}

module.exports = {
    lista_cliente_tipos,
    registrar_cliente,
    login_cliente,
    lista_actividad_eco,
    lista_sector_eco,
    create_cliente_info,
    lista_cliente_info,
    update_cliente_info
};

/* servivios de cliente */

async function lista_cliente_tipos() {
    return ({ successful: true, data: await Clientes_tipo.findAll() });
}

async function registrar_cliente(data) {
    if( data.cod_referido !== '' ){
        var validar1 = await Cliente.findOne({ where: { cod_personal: data.cod_referido } });
        if (validar1 !== null) {
            return { successful: false, error: "Codigo de Referido No valido" };
        }        
    }

    var ban = 1;
    var cod = '';
    var val = '';
    do {
        cod = generarCodigoUnico();
        val = await Cliente.findOne({ where: { cod_personal: cod } })
        if (val === null) {
            ban = 0;
        }    
    } while (ban);

    const salt = bcrypt.genSalt(process.env.SAL_ROUND);
    data.password = bcrypt.hash(data.password, salt);
    data.cod_personal = cod;
    data.id_cliente_tipo = 1;

    try {
        var cliente = await Cliente.create(data);
        return { successful: true, data: cliente };
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }
}

async function login_cliente(data) {

    var select = `SELECT c.*, ct.nombre_tipo_cliente FROM clientes c 
    inner join cliente_tipos as ct on ct.id = c.id_cliente_tipo
    where c.email = '${data.email}' limit 1`;

    var cliente = await Cliente.sequelize.query(select, { type: QueryTypes.SELECT });
    cliente = cliente[0];

    return await bcrypt.compare(data.password, cliente.password).then(async (respuerta) => {
        if (respuerta) {
            var obj = {
                id: cliente.id,
                id_cliente_tipo: cliente.id_cliente_tipo,
                email: cliente.email,
                cod_referido: cliente.cod_referido,
                cod_personal: cliente.cod_personal,
                nombre_tipo_cliente: cliente.nombre_tipo_cliente,
                createdAt: cliente.createdAt,
                updatedAt: cliente.updatedAt
            };

            var token = jwt.sign(
                obj,
                process.env.SAL_CLIENTE,
                { expiresIn: "24h", }
            );

            return {
                successful: true,
                token: token,
                cliente: obj
            }
        } else {
            return { successful: false, error: "password invalido" }
        }
    });
}

/* servivios de cliente_info */

async function lista_actividad_eco() {
    return ({ successful: true, data: await Actividad_eco.findAll() });
}

async function lista_sector_eco() {
    return ({ successful: true, data: await Sector_eco.findAll() });
}

async function lista_cliente_info(id) {
    return ({ successful: true, data: await Cliente_info.findOne({ where: { id_cliente: parseInt(id) } }) });
}

async function create_cliente_info(data) {

    var id = await Cliente_info.max('id');
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + id);

    // Crear un directorio para guardar la foto si no existe
    const uploadDir = path.join(__dirname, 'uploads\\'+ id);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    return ;  
    // Mover el archivo a la carpeta de destino
    const oldPath = req.file.path;
    const newPath = path.join(uploadDir, req.file.originalname);
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error('Error al mover el archivo:', err);
        return res.status(500).json({ error: 'Error al guardar el archivo' });
      }
      // Archivo guardado con éxito
      res.status(200).json({ message: 'Archivo guardado con éxito' });
    });


    var obj = {
        id_cliente: data.id_cliente,
        id_dpto: data.id_dpto,
        id_ciudad: data.id_ciudad,
        id_user_tipo_doc: data.id_user_tipo_doc,
        id_cliente_actividad_eco: data.id_cliente_actividad_eco,
        id_cliente_sector_eco: data.id_cliente_sector_eco,
        nombres_cliente: data.nombres_cliente,
        apellidos_cliente: data.apellidos_cliente,
        fecha_nac: data.fecha_nac,
        direccion: data.direccion,
        num_documento: data.num_documento,
        otro_sector_y_actividad: data.otro_sector_y_actividad,
        nombre_empresa_labora: data.nombre_empresa_labora,
        ingreso_mesual: data.ingreso_mesual,
        gasto_mensual: data.gasto_mensual,
        foto_doc_frontal: data.foto_doc_frontal,
        foto_doc_trasera: data.foto_doc_trasera,
        foto_recivo_publico: data.foto_recivo_publico,
        foto_pago_nomina: data.foto_pago_nomina,
        tratamiento_datos: data.tratamiento_datos,
        terminos_y_condiciones: data.terminos_y_condiciones,
        rf1_nombre_completo: data.rf1_nombre_completo,
        rf1_num_celular: data.rf1_num_celular,
        rf1_direccion: data.rf1_direccion,
        rf2_nombre_completo: data.rf2_nombre_completo,
        rf2_num_celular: data.rf2_num_celular,
        rf2_direccion: data.rf2_direccion
    };

    /*const salt = await bcrypt.genSalt(process.env.SAL);
    obj.password = await bcrypt.hash(data.password, salt);

    try {
        var new_user = await User.create(obj);
        return lista_users(new_user.id);
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }*/

}

async function update_cliente_info(data) {
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
        const salt = await bcrypt.genSalt(process.env.SAL_ROUND);
        obj.password = await bcrypt.hash(data.password, salt);
    }

    try {
        user.update(obj);
        return lista_users(data.id);
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }
}