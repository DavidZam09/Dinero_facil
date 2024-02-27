const { validationResult } = require("express-validator");
const fs = require("fs");
var path = require("path");
const Cliente = require("./Services_cliente");
const Cliente_info = require("./Model_clientes_info");

module.exports = {
    dptxciudades,
    lista_cliente_tipos,
    registrar_cliente,
    login_cliente,
    lista_actividad_eco,
    lista_sector_eco,
    lista_cliente_infoxcliente,
    input_cliente_info,
};

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        borrarContenidoCarpeta();
        return res.json({ successful: false, errors: errors.array() });
    }

    var array_name = [];

    //valido ext de documento
    for (const fileField in req.files) {
        //valido extenciones
        const file = req.files[fileField];
        const fileType = path.extname(file).toLowerCase();
        if (fileType !== '.pdf' && !['.jpg', '.jpeg', '.png', '.gif'].includes(fileType)) {
            borrarContenidoCarpeta();
            //return res.status(400).json({ error: 'Los archivos deben ser imágenes (jpg, jpeg, png, gif) o PDF' });
            return res.json({ successful: false, errors: 'Los archivos deben ser imágenes (jpg, jpeg, png, gif) o PDF' });
        }

        //armo array de documentos para comparar
        var name_file = path.basename(file);
        const regex = new RegExp(fileType, 'g');
        name_file = name_file.replace(regex, '');
        array_name.push(name_file);
    }

    //comparo arrays para comparar y ver cual falta
    const array = ['foto_cliente', 'foto_doc_frontal', 'foto_doc_trasera', 'foto_recivo_publico', 'foto_pago_nomina'];
    if (req.body.id === "" || req.body.id === null){
        const diferenciaTotal = array.concat(array_name);
        if (diferenciaTotal.length !== 0) {
            var text = '';
            diferenciaTotal.forEach(ele => {
                text = ele + ', ';
            });
            borrarContenidoCarpeta();
            return res.json({ successful: false, errors: "falta el documento: " + text });
        }
        var val = await Cliente_info.findOne({ where: { id_cliente: parseInt(id) } });
        if( val ){
            return res.json({ successful: false, errors: "El cliente_info ya existe: " + val.id });
        }
    }else{
        var val1 = await Cliente_info.findOne({ where: { id: req.body.id } });
        if (val1 === null){
            return res.json({ successful: false, errors: "El id del cliente_info no existe: " + req.body.id });
        }
        if (val2.id_cliente === req.body.id_cliente ){
            return res.json({ successful: false, errors: "la informacion del id_cliente y el id_cliente_info no coincide con lo encontrado en base de datos" });
        }
        for (const fileField in array_name) {
            const indice = array.indexOf(fileField);
            if (indice !== -1) {
                borrarContenidoCarpeta();
                return res.json({ successful: false, errors: "falta el documento: " + fileField });
            }
        }
    }

    return Cliente.input_cliente_info(req).then((respuerta) => {
        return res.send(respuerta);
    });
}

async function borrarContenidoCarpeta() {
    var id = (await Cliente_info.max("id")) + 1;
    var dir = "../../uploads/" + id;
    carpeta = path.join(__dirname, dir);

    // Lee el contenido de la carpeta
    fs.readdir(carpeta, (err, archivos) => {
        if (err) {
            console.error('Error al leer la carpeta:', err);
            return;
        }

        // Itera sobre los archivos y borra cada uno
        for (const archivo of archivos) {
            const rutaArchivo = path.join(carpeta, archivo);

            // Verifica si el archivo es una carpeta
            fs.stat(rutaArchivo, (err, stats) => {
                if (err) {
                    console.error('Error al obtener la información del archivo:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    // Si es una carpeta, llamamos recursivamente a la función para borrar su contenido
                    borrarContenidoCarpeta(rutaArchivo);
                } else {
                    // Si es un archivo, lo borramos
                    fs.unlink(rutaArchivo, err => {
                        if (err) {
                            console.error('Error al borrar el archivo:', err);
                            return;
                        }
                        console.log(`Archivo eliminado: ${rutaArchivo}`);
                    });
                }
            });
        }
    });
}
