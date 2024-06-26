const { validationResult } = require("express-validator");
const fs = require("fs");
var path = require("path");

const Cliente = require("./Services_cliente");

module.exports = {
    dptxciudades,
    lista_cliente_tipos,
    registrar_cliente,
    login_cliente,
    lista_actividad_eco,
    lista_sector_eco,
    lista_cliente_infoxcliente,
    input_cliente_info,
    borrarContenidoCarpeta,
    val_correo_cliente,
    cambio_pass,
    lista_clientesxadmin,
    update_aprobacion_cliente,
    get_doc
};

/////////////////////////////////////////////////////////////////// Controlador para los Admin //////////////////////////////////////////////////////////////////
function get_doc(req, res, next) {

    const dir = `../../uploads${req.query.doc}`;
    uploadDir = path.join(__dirname, dir);

    if (!fs.existsSync(uploadDir)) {
        res.json({ successful: false, data: "El Documento no existe" });
    }

    res.download(path.resolve(uploadDir), function(err) {
        if(err) {
            console.log(err);
        }else{
            console.log('Download Completed');
        }
    })
}

function lista_clientesxadmin(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.lista_clientesxadmin( req.query ).then((respuerta) => {
        return res.send(respuerta);
    });
}

function update_aprobacion_cliente(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.update_aprobacion_cliente(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

function val_correo_cliente(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.val_correo_cliente(req.query).then((respuerta) => {
        return res.send(respuerta);
    });
}

function cambio_pass(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.cambio_pass(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}


/////////////////////////////////////////////////////////////////// Controlador para los Clientes //////////////////////////////////////////////////////////////////

function dptxciudades(req, res, next) {
    fs.readFile(__dirname + "/dpt_y_ciudades.json", "utf8", function (err, data) {
        res.set({ "content-type": "application/json; charset=utf-8" });
        res.end(data);
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

async function input_cliente_info(req, res, next) {

    //valido errores de data 
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        borrarContenidoCarpeta(req.files);
        return res.json({ successful: false, errors: errors.array() });
    }
    
    var array_name = [];

    //valido ext de documento
    for (const fileField in req.files) {
        //valido extenciones
        const file = req.files[fileField];
        const fileType = path.extname(file).toLowerCase();
        if (fileType !== '.pdf' && !['.jpg', '.jpeg', '.png', '.gif'].includes(fileType)) {
            borrarContenidoCarpeta(req.files);
            return res.json({ successful: false, errors: 'Los archivos deben ser imágenes (jpg, jpeg, png, gif) o PDF' });
        }

        //armo array de documentos subidos para comparar
        var name_file = path.basename(file);
        const regex = new RegExp(fileType, 'g');
        name_file = name_file.replace(regex, '');
        array_name.push(name_file);
    }

    //comparo arrays el de referencia y el de archivos subidos
    const array = ['foto_cliente', 'foto_doc_frontal', 'foto_doc_trasera', 'foto_recivo_publico', 'foto_pago_nomina'];
    if (req.body.id === "" || req.body.id === null) {
        const diferenciaTotal = array.filter(elemento => array_name.indexOf(elemento) == -1);
        if (diferenciaTotal.length !== 0) {
            var text = '';
            diferenciaTotal.forEach(ele => {
                text = ele + ', ';
            });
            borrarContenidoCarpeta(req.files);
            return res.json({ successful: false, errors: "falta el documento: " + text });
        }
    }

    return Cliente.input_cliente_info( req.body ).then((respuerta) => {
        return res.send(respuerta);
    });
}

async function borrarContenidoCarpeta(array) {
    // Itera sobre los archivos y borra cada uno
    for (const archivo of array) {
        fs.unlink(archivo, err => {
            if (err) {
                console.error('Error al borrar el archivo:', err);
                return;
            }
            console.log(`Archivo eliminado: ${archivo}`);
        });
    }
}
