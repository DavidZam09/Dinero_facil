const fs = require("fs");
var path = require("path");
const Busboy = require("busboy");
const { v4: uuidv4 } = require('uuid');

function generarCodigoUnico() {
  const uuid = uuidv4();
  const codigoAlfanumerico = uuid.replace(/-/g, '').substring(0, 10);
  return codigoAlfanumerico;
}

module.exports = {
  files_save
};

async function files_save(req, res, next) {
  const busboy = Busboy({ headers: req.headers });
  req.body = {};
  req.files = [];
  var uploadDir = "";
  var filePath = '';
  var ext = '';
  var nombreArchivo = '';

  const cod = generarCodigoUnico();
  var dir = `../uploads/temp/doc/${cod}/`;
  uploadDir = path.join(__dirname, dir);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  req.body['nom_carpeta'] = cod;
  //captura la data en body
  busboy.on('field', (fieldname, value) => {
    req.body[fieldname] = value;
  });

  //guardo archivos y captura la data en body
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    ext = filename.filename.split(".")[1];
    nombreArchivo = `${fieldname}.${ext}`;
    filePath = `${uploadDir}/${nombreArchivo}`;
    file.pipe(fs.createWriteStream(filePath));
    req.body[fieldname] = filePath;
    req.files.push(filePath);
  });

  //retorno
  busboy.on('finish', async () => {
    next();
  });

  req.pipe(busboy);
}