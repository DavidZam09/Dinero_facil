const { QueryTypes, Op } = require("sequelize");
const SQL = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
var path = require("path");

const Clientes_tipo = require("./Model_clientes_tipo");
const Cliente = require("./Model_cliente");

const Actividad_eco = require("./Model_clientes_actividad_eco");
const Sector_eco = require("./Model_clientes_sector_eco");
const Cliente_info = require("./Model_clientes_info");
const Config = require("../Creditos/Model_config");
const Config_mensajes = require("../Creditos/Model_config_mensaje");
const Email = require("../../Helpers/Email_config");

const { v4: uuidv4 } = require("uuid");
const User = require("../Usuarios/Model_usuario");

function generarCodigoUnico() {
  const uuid = uuidv4();
  const codigoAlfanumerico = uuid.replace(/-/g, "").substring(0, process.env.LOG_GUID);
  return codigoAlfanumerico;
}

module.exports = {
  lista_cliente_tipos,
  registrar_cliente,
  login_cliente,
  lista_actividad_eco,
  lista_sector_eco,
  lista_cliente_infoxcliente,
  input_cliente_info,
};

/* servivios de cliente */

async function lista_cliente_tipos() {
  return { successful: true, data: await Clientes_tipo.findAll() };
}

async function registrar_cliente(data) {
  if (data.cod_referido !== "") {
    var validar1 = await Cliente.findOne({
      where: { cod_personal: data.cod_referido },
    });
    if (validar1 !== null) {
      return { successful: false, error: "Codigo de Referido No valido" };
    }
  }

  var ban = 1;
  var cod = "";
  var val = "";
  do {
    cod = generarCodigoUnico();
    val = await Cliente.findOne({ where: { cod_personal: cod } });
    if (val === null) {
      ban = 0;
    }
  } while (ban);

  const salt = await bcrypt.genSalt(Number(process.env.SAL_ROUND));
  data.password = await bcrypt.hash(data.password, salt);
  data.cod_personal = cod;
  data.id_cliente_tipo = 1;

  try {
    var cliente = await Cliente.create(data);
    delete cliente.password;
  } catch (error) {
    console.log(error);
    return { successful: false, error: error };
  }

  // envio de correo
  var mensajes = await Config_mensajes.findOne({ where: { id: 2 } });
  const config = await Config.findAll({
    where:{
       id: { [Op.in]: [4,6] }
    }
 });
   
  const mailOptions = {
    from: config.valor_variable,
    to: data.email,
    subject:  mensajes.asunto_mensaje,
    text:  mensajes.mensaje.replace('||1', config[1].valor_variable)//mensajes.mensajes
  };
  const transporter = await Email.createTransporter();
  await Email.sendMail(transporter, mailOptions);

  return { successful: true, data: cliente };
}

async function login_cliente(data) {
  var select = `SELECT c.*, ct.nombre_tipo_cliente FROM clientes c 
    inner join cliente_tipos as ct on ct.id = c.id_cliente_tipo
    where c.email = '${data.email}' limit 1`;

  var cliente = await Cliente.sequelize.query(select, {
    type: QueryTypes.SELECT,
  });
  cliente = cliente[0];

  return await bcrypt
    .compare(data.password, cliente.password)
    .then(async (respuerta) => {
      if (respuerta) {
        var obj = {
          id: cliente.id,
          id_cliente_tipo: cliente.id_cliente_tipo,
          email: cliente.email,
          cod_referido: cliente.cod_referido,
          cod_personal: cliente.cod_personal,
          nombre_tipo_cliente: cliente.nombre_tipo_cliente,
          createdAt: cliente.createdAt,
          updatedAt: cliente.updatedAt,
        };

        var token = jwt.sign(obj, process.env.SAL_CLIENTE, {
          expiresIn: "24h",
        });

        return {
          successful: true,
          token: token,
          cliente: obj,
        };
      } else {
        return { successful: false, error: "password invalido" };
      }
    });
}

/* servivios de cliente_info */

async function lista_actividad_eco() {
  return { successful: true, data: await Actividad_eco.findAll() };
}

async function lista_sector_eco() {
  return { successful: true, data: await Sector_eco.findAll() };
}

async function lista_cliente_infoxcliente(id) {
  var select = `SELECT ci.*, cae.nombre_actividad_eco, cse.nombre_sector_eco, 
  utd.nombre_tipo_doc, c.email, c.num_celular FROM cliente_infos AS ci 
  INNER JOIN clientes AS c ON c.id = ci.id_cliente
  INNER JOIN cliente_actividad_ecos AS cae ON cae.id = ci.id_cliente_actividad_eco 
  INNER JOIN cliente_sector_ecos AS cse ON cse.id = ci.id_cliente_sector_eco 
  INNER JOIN user_tipo_docs AS utd ON utd.id = ci.id_user_tipo_doc 
  WHERE ci.id_cliente = ${id} LIMIT 1`;
  var data = await Cliente_info.sequelize.query(select, { type: QueryTypes.SELECT });
  return ({ successful: true, data: data });
}

async function input_cliente_info(datos) {

  var resp = '';
  var data = '';
  //creo la nueva carpeta donde van a estar los documentos 
  var dir = `../../uploads/doc/${datos.id_cliente}/`;
  const destDir = path.join(__dirname, dir);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  dir = `../../uploads/temp/doc/${datos.nom_carpeta}/`;
  const sourceDir = path.join(__dirname, dir);

  //muevo archivos
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach(file => {
      const oldPath = path.join(sourceDir, file);
      const newPath = path.join(destDir, file);
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Archivo '${file}' movido correctamente.`);
      });
    });
  });

  var titulo = null;
  var user = null;
  datos.nota_admin = null;
  try {
    if (datos.id === "" || datos.id === null) {
      titulo = "Creacion ";
      data = await Cliente_info.create(datos); // guardo

      // filtro a usuario con menos carga laboral en tres dias 
      const select = `
      SELECT 
        u.id,
        u.email, 
        IFNULL(cont.contador, 0) AS contador
      FROM users u 
      LEFT JOIN (
        SELECT  COUNT(c.id) contador, c.id_usuario AS id FROM clientes AS c
        INNER JOIN cliente_infos as ci ON  ci.id_cliente = c.id
        WHERE ci.createdAt BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND NOW()
        GROUP BY c.id_usuario
      ) AS cont ON cont.id = u.id 
      where  u.id_user_rol = 1 and u.activo = 'SI' 
      ORDER BY IFNULL(cont.contador, 0) ASC LIMIT 1`;
      user = await Cliente_info.sequelize.query(select, { type: QueryTypes.SELECT });

      //actualizo usuario encargado
      const cliente = await Cliente.findOne({ where: { id: datos.id_cliente } });
      cliente.update({ id_usuario: user[0].id });
    }else {
      titulo = "Actualicion "
      data = await Cliente_info.findOne({ where: { id: datos.id } });
      data.update(datos);
      const cliente = await Cliente.findOne({ where: { id: datos.id_cliente } });
      user = await User.findAll({ where: { id: cliente.id_usuario } });
    }
  } catch (error) {
    return {
      successful: false,
      data: "Error Al intentar Guardar en base de datos",
    };
  }

  resp = await lista_cliente_infoxcliente(datos.id_cliente);

  const mensajes = await Config_mensajes.findAll({
    where:{
       id: { [Op.in]: [1, 3] }
    }
 });

  // envio de correo cliente
  const correo_envia = await Config.findOne({ where: { id: 4 } });
  const mailOptions1 = {
    from: correo_envia.valor_variable,
    to: resp.data[0].email,
    subject: titulo + mensajes[0].asunto_mensaje,
    text: mensajes[0].mensaje
  };
  const transporter1 = await Email.createTransporter();
  await Email.sendMail(transporter1, mailOptions1);

  // envio de correo admin
  var text = mensajes[1].mensaje.replace('||1', titulo);
  text = text.replace('||2', `${ resp.data[0].nombres_cliente } ${ resp.data[0].apellidos_cliente }`);
  text = text.replace('||3', resp.data[0].email);
  text = text.replace('||4', resp.data[0].num_celular);
  const mailOptions2 = {
    from: correo_envia.valor_variable,
    to: user[0].email,
    subject: mensajes[1].asunto_mensaje.replace('||1', titulo),
    text: text,
  };
  const transporter2 = await Email.createTransporter();
  await Email.sendMail(transporter2, mailOptions2);

  return resp
}
