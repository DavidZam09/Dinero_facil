const { QueryTypes } = require("sequelize");
const SQL = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const Clientes_tipo = require("./Model_clientes_tipo");
const Cliente = require("./Model_cliente");

const Actividad_eco = require("./Model_clientes_actividad_eco");
const Sector_eco = require("./Model_clientes_sector_eco");
const Cliente_info = require("./Model_clientes_info");
const Config = require("../Creditos/Model_config");
const Email = require("../../Helpers/Email_config");

const { v4: uuidv4 } = require("uuid");
//const { log } = require("console");

function generarCodigoUnico() {
  const uuid = uuidv4();
  const codigoAlfanumerico = uuid
    .replace(/-/g, "")
    .substring(0, process.env.LOG_GUID);
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
  return {
    successful: true,
    data: await Cliente_info.findOne({ where: { id_cliente: parseInt(id) } }),
  };
}

async function input_cliente_info(req) {
  try {
    const data = await Cliente_info.create(req.body);
    const resp =  await lista_cliente_infoxcliente(data.id_cliente);

    // envio de correo
    const config = await Config.findAll();
    const mailOptions = {
        from: 'tu_correo@example.com',
        to: 'correo_destino@example.com',
        subject: 'Asunto del correo',
        text: 'Contenido del correo'
    };
    const transporter = Email.createTransporter();
    await sendMail(transporter, mailOptions);

  } catch (error) {
    return {
      successful: false,
      data: "Error Al intentar Guardar en base de datos",
    };
  }
}
