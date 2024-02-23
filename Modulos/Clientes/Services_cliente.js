const { QueryTypes } = require('sequelize');
const SQL = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const fs = require('fs');
var path = require('path');
const Busboy = require('busboy');

const Clientes_tipo = require('./Model_clientes_tipo');
const Cliente = require('./Model_cliente');

const Actividad_eco = require('./Model_clientes_actividad_eco');
const Sector_eco = require('./Model_clientes_sector_eco');
const Cliente_info = require('./Model_clientes_info');

const { v4: uuidv4 } = require('uuid');
const { log } = require('console');

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
    lista_cliente_infoxcliente,
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

async function lista_cliente_infoxcliente(id) {
    return ({ successful: true, data: await Cliente_info.findOne({ where: { id_cliente: parseInt(id) } }) });
}

async function create_cliente_info( req ) {

    const busboy = Busboy({ headers: req.headers });
    var data = req.body;

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
        foto_cliente: '',
        foto_doc_frontal: '',
        foto_doc_trasera: '',
        foto_recivo_publico: '',
        foto_pago_nomina: '',
        tratamiento_datos: data.tratamiento_datos,
        terminos_y_condiciones: data.terminos_y_condiciones,
        rf1_nombre_completo: data.rf1_nombre_completo,
        rf1_num_celular: data.rf1_num_celular,
        rf1_direccion: data.rf1_direccion,
        rf2_nombre_completo: data.rf2_nombre_completo,
        rf2_num_celular: data.rf2_num_celular,
        rf2_direccion: data.rf2_direccion
    };

    var uploadDir = '';
    try {
        //genera carpeta
        var  id = await Cliente_info.max('id')+1;
        var dir = '../../uploads/' + id;    
        uploadDir = path.join(__dirname, dir);
    
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
    } catch (error) {
        return ({ successful: false, data: "Ocurrio un error al intentar crear la carpeta de los archivos" });
    }

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        //const saveTo = path.join(__dirname, 'uploads', filename);
        var ext = filename.filename.split('.')[1];
        const nombreArchivo = `${fieldname}.${ext}`;
        filePath = `./uploads/${id}/${nombreArchivo}`;
        file.pipe(fs.createWriteStream(filePath));
        console,log(fieldname);

        switch (fieldname) {
            case "foto_cliente":
                obj.foto_cliente = filePath;
                break;
            case "foto_doc_frontal":
                obj.foto_doc_frontal = filePath;
                break;
            case "foto_doc_trasera":
                obj.foto_doc_trasera = filePath;
                break;
            case "foto_recivo_publico":
                obj.foto_recivo_publico = filePath;
                break;
            case "foto_pago_nomina":
                obj.foto_pago_nomina = filePath;
                break;
            default: null;
                break;
        }
    });

    req.pipe(busboy);

    try {
        const cliente_info = await Cliente_info.create(obj);
        return lista_cliente_infoxcliente( cliente_info.id_cliente )
    } catch (error) {
        return({ successful: false, data: error });
    }
}


async function create_cliente_info( req ) {

    const busboy = Busboy({ headers: req.headers });
    var data = req.body;
    var obj = {
        id: data.id,
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
        foto_cliente: '',
        foto_doc_frontal: '',
        foto_doc_trasera: '',
        foto_recivo_publico: '',
        foto_pago_nomina: '',
        tratamiento_datos: data.tratamiento_datos,
        terminos_y_condiciones: data.terminos_y_condiciones,
        rf1_nombre_completo: data.rf1_nombre_completo,
        rf1_num_celular: data.rf1_num_celular,
        rf1_direccion: data.rf1_direccion,
        rf2_nombre_completo: data.rf2_nombre_completo,
        rf2_num_celular: data.rf2_num_celular,
        rf2_direccion: data.rf2_direccion
    };

    var uploadDir = '';
    try {
        //genera carpeta
        var  id = await Cliente_info.max('id');
        var dir = '../../uploads/' + id;    
        uploadDir = path.join(__dirname, dir);
    
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
    } catch (error) {
        return ({ successful: false, data: "Ocurrio un error al intentar crear la carpeta de los archivos" });
    }

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        var ext = filename.filename.split('.')[1];
        const nombreArchivo = `${fieldname}.${ext}`;
        filePath = `./uploads/${id}/${nombreArchivo}`;
        file.pipe(fs.createWriteStream(filePath));
        console,log(fieldname);

        switch (fieldname) {
            case "foto_cliente":
                obj.foto_cliente = filePath;
                break;
            case "foto_doc_frontal":
                obj.foto_doc_frontal = filePath;
                break;
            case "foto_doc_trasera":
                obj.foto_doc_trasera = filePath;
                break;
            case "foto_recivo_publico":
                obj.foto_recivo_publico = filePath;
                break;
            case "foto_pago_nomina":
                obj.foto_pago_nomina = filePath;
                break;
            default: null;
                break;
        }
    });

    req.pipe(busboy);

    try {
        const cliente_info = await Cliente_info.create(obj);
        return lista_cliente_infoxcliente( cliente_info.id_cliente )
    } catch (error) {
        return({ successful: false, data: error });
    }
}
