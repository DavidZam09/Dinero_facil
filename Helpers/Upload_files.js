const Cliente_info = require("../Modulos/Clientes/Model_clientes_info");
const fs = require("fs");
var path = require("path");
const Busboy = require("busboy");

module.exports = {
    files_body,
    files_save
  };

  async function files_body(req, res, next) {
    const busboy = Busboy({ headers: req.headers });
    req.body = {};
  
    //estructuro data body
    busboy.on('field', (fieldname, value) => {
        req.body[fieldname] = value;
    });
  
    //retorno
    busboy.on('finish', async () => {
      next();
    });  
    
    req.pipe(busboy);
  }

async function files_save(req, res, next) {
    const busboy = Busboy({ headers: req.headers });
  
    //req.body = {};
    req.files = [];
    var uploadDir = "";

    //genera carpeta
    var id = '';
    if( ( req.body.id === null ) || ( req.body.id === '') ){
      id = (await Cliente_info.max("id")) + 1;
    }else{
      id = (await Cliente_info.max("id", {where : { id_cliente: req.body.id }}));
    }

    var dir = "../uploads/" + id;
    uploadDir = path.join(__dirname, dir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    //guardo archivos y estructuro data
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      var ext = filename.filename.split(".")[1];
      const nombreArchivo = `${fieldname}.${ext}`;
      //filePath = `../uploads/${id}/${nombreArchivo}`;
      filePath = `${uploadDir}/${nombreArchivo}`;
      file.pipe(fs.createWriteStream(filePath));
      req.body[fieldname] = filePath;
      req.files.push(filePath);
    })
  
    //retorno
    busboy.on('finish', async () => {
      next();
    });  
    
    req.pipe(busboy);
  }