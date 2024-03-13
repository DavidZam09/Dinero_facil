const { QueryTypes, Op } = require("sequelize");
const fs = require("fs");
var path = require("path");
const moment = require('moment');
const Email = require("../../Helpers/Email_config");

const Bancos = require("./Model_credito_bancos");
const Credito_estados = require("./Model_credito_estados");
const Creditos = require("./Model_creditos");
const Creditos_cotizacion = require("./Model_credito_cotizacion");
const Credito_pago_estados = require("./Model_credito_pago_estados");
const Credito_pago_cuotas = require("./Model_credito_pago_cuotas");
const Config = require("../Creditos/Model_config");
const Config_mensajes = require("../Creditos/Model_config_mensaje");
const Cliente = require("../Clientes/Model_cliente");

module.exports = {
  lista_bancos,
  lista_credito_estados,
  un_credito,
  input_credito,
  lista_credito_cotizacion,
  cotizacion_credito,
  //input_credito_cotizacion,
  lista_credito_estados_pago,
  lista_credito_pago,
  update_credito_pagoxcliente,
  un_credito,
  lista_creditosxcliente,
  create_aprobacion_credito,
  lista_pago_cuotasxuser
};

/////////////////////////////////////////////////////////////////// servivios de los clientes //////////////////////////////////////////////////////////////////
async function lista_bancos() {
  return { successful: true, data: await Bancos.findAll() };
}

async function lista_credito_estados() {
  return { successful: true, data: await Credito_estados.findAll() };
}

async function un_credito(id) {
  var select = `SELECT c.*, cb.nombre_credito_bancos, ce.nombre_credito_tipo, 
  ci.nombres_cliente, ci.apellidos_cliente, c2.email, c2.num_celular
  FROM creditos AS c 
  LEFT JOIN credito_bancos AS cb ON cb.id = c.id_banco
  INNER  JOIN credito_estados AS ce ON ce.id = c.id_credito_estado
  INNER  JOIN cliente_infos AS ci ON ci.id_cliente = c.id_cliente
  INNER  JOIN clientes AS c2 ON c2.id = c.id_cliente
  WHERE c.id = ${id} LIMIT 1`;
  var data = await Creditos.sequelize.query(select, { type: QueryTypes.SELECT });
  return ({ successful: true, data: data });
}

async function input_credito(datos) {

  var obj = {
    id: datos.id,
    id_credito_estado: 1,
    id_banco: datos.id_banco,
    id_cliente: datos.id_cliente,
    tipo_cobro: datos.tipo_cobro,
    num_cuenta: datos.num_cuenta,
    tipo_cuenta: datos.tipo_cuenta,
    nota_cliente: datos.nota_cliente,
    num_cuotas: datos.num_cuotas,
    nota_admin: null
  }

  if ((datos.id === '') || (datos.id === null)) {
    const { valor_prestamo, frecuencia_cobro, interes, interes_mora } = await Creditos_cotizacion.findOne({ where: { id: datos.id_credito_cotizacion } });
    obj.valor_credito = valor_prestamo;
    obj.valor_interes = interes;
    obj.valor_interes_mora = interes_mora;
    obj.frecuencia_cobro = frecuencia_cobro;
    obj.id_credito_estado = datos.id_credito_estado;
  }

  if (datos.tipo_cobro === 'Efectivo') {
    obj.id_banco = null;
    obj.tipo_cuenta = null;
    obj.num_cuenta = null;
  }

  var titulo = null;
  var data = null;
  try {
    if (datos.id === "" || datos.id === null) {
      data = await Creditos.create(obj);
      titulo = "Solicitud";
    } else {
      data = await Creditos.findOne({ where: { id: datos.id } });
      data.update(obj);
      titulo = "Actualizacion"
    }
  } catch (error) {
    return {
      successful: false,
      data: "Error Al intentar Guardar en base de datos",
    };
  }

  const user = await Cliente.findOne({ where: { id: datos.id_cliente } });
  const resp = await un_credito(data.id);
  const correo_envia = await Config.findOne({ where: { id: 4 } });
  const mensajes = await Config_mensajes.findAll({
    where: {
      id: { [Op.in]: [4, 5] }
    }
  })

  // envio de correo cliente
  var text = mensajes[0].mensaje.replace('||1', titulo);
  text = text.replace('||2', resp.data[0].valor_credito)
  const mailOptions1 = {
    from: correo_envia.valor_variable,
    to: resp.data[0].email,
    subject: titulo + mensajes[0].asunto_mensaje,
    text: text
  };
  const transporter1 = await Email.createTransporter();
  await Email.sendMail(transporter1, mailOptions1);

  // envio de correo admin
  var text1 = mensajes[1].mensaje.replace('||1', data.valor_credito);
  text1 = text1.replace('||2', `${resp.data[0].nombres_cliente} ${resp.data[0].apellidos_cliente}`);
  text1 = text1.replace('||3', resp.data[0].email);
  text1 = text1.replace('||4', resp.data[0].num_celular);
  const mailOptions2 = {
    from: correo_envia.valor_variable,
    to: user.email,
    subject: mensajes[1].asunto_mensaje.replace('||1', titulo),
    text: text1,
  };
  const transporter2 = await Email.createTransporter();
  await Email.sendMail(transporter2, mailOptions2);

  return resp;
}

async function lista_credito_cotizacion() {
  return { successful: true, data: await Creditos_cotizacion.findAll() };
}

async function cotizacion_credito(req) {

  const { num_cuotas, fec_desembolso } = req;
  const { valor_prestamo, frecuencia_cobro, interes, interes_mora } = await Creditos_cotizacion.findOne({ where: { id: req.id } });

  const dias = frecuencia_cobro === 'Semanal' ? 7 : 15;
  var array_cuotas = [];
  var total = null;
  var fecha_carry = fec_desembolso;

  for (let index = 0; index < num_cuotas; index++) {
    fecha_carry = new Date(fecha_carry);
    fecha_carry = fecha_carry.setDate(fecha_carry.getDate() + dias);
    fecha_carry = new Date(fecha_carry).toISOString();
    fecha_carry = fecha_carry.split('T')[0];
    const obj = {
      n_cuota: index + 1,
      cuota: valor_prestamo / num_cuotas,
      interes: interes,
      subtotal: valor_prestamo / num_cuotas + interes,
      fecha_pago_cuota: fecha_carry
    };
    array_cuotas.push(obj);
    total += valor_prestamo / num_cuotas + interes;
  }
  return {
    successful: true, data: {
      valor_prestamo: valor_prestamo,
      interes_mora: interes_mora,
      interes: interes,
      total_pagado: total,
      num_cuotas: num_cuotas,
      fecha_desembolso: fec_desembolso,
      frecuencia_cobro: frecuencia_cobro,
      cuotas: array_cuotas
    }
  };
}


/*async function input_credito_cotizacion( datos ) {

  var obj = {
    id: datos.id,
    valor_prestamo : datos.valor_prestamo,
    frecuencia_cobro: datos.frecuencia_cobro,
    interes: datos.interes,
    interes_mora: datos.interes_mora,
    activo: datos.activo
  }

  var data = null;
  try {
    if (datos.id === "" || datos.id === null){
      data = await Creditos_cotizacion.create(obj);
    }else{
      data = await Creditos_cotizacion.findOne({ where: { id: datos.id } });
      data.update(obj);
    }
    return { successful: true, data: data };
  } catch (error) {
    return {
      successful: false,
      data: "Error Al intentar Guardar en base de datos",
    };
  }
}*/

async function lista_credito_estados_pago() {
  return { successful: true, data: await Credito_pago_estados.findAll() };
}

async function lista_credito_pago(id_credito, id) {

  var where = null;
  if (id_credito !== null) {
    where = "cpc.id_credito = " + id_credito;
  } else {
    where = "cpc.id = " + id;
  }

  var select = `SELECT cpc.*, cpe.nombre_estado_pago FROM credito_pago_cuotas as cpc
  INNER JOIN credito_pago_estados AS cpe ON cpe.id = cpc.id_credito_pago_estado
  WHERE ${where}`;
  var data = await Creditos.sequelize.query(select, { type: QueryTypes.SELECT });
  return ({ successful: true, data: data });
}

async function update_credito_pagoxcliente(datos) {

  //consulto data para despues mover el archivo
  const data = await Credito_pago_cuotas.findOne({ where: { id: datos.id } });
  const data2 = await Creditos.findOne({ where: { id: data.id_credito } });
  const fileType = path.extname(datos.soporte_pago).toLowerCase();

  //creo carpetas y muevo y renobro el archivo
  var dir = `../../uploads/doc/${data2.id_cliente}/creditos/${data2.id}/`;
  const destDir = path.join(__dirname, dir);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  await fs.promises.rename(datos.soporte_pago, destDir + `${data.num_pago}${fileType}`);

  // se actualiza pago
  try {
    await data.update({
      id: datos.id,
      soporte_pago: datos.soporte_pago,
      id_credito_pago_estado: 2,
      fecha_pago: moment().format('YYYY-MM-DD'),
      nota_admin: null
    });
  } catch (error) {
    return {
      successful: false,
      data: "Error Al intentar Guardar en base de datos",
    };
  }


  const user = await Cliente.findOne({ where: { id: data2.id_cliente } });
  const resp = await un_credito(data.id_credito);
  const correo_envia = await Config.findOne({ where: { id: 4 } });
  const mensajes = await Config_mensajes.findAll({
    where: {
      id: { [Op.in]: [6, 7] }
    }
  })

  // envio de correo cliente
  const mailOptions1 = {
    from: correo_envia.valor_variable,
    to: resp.data[0].email,
    subject: mensajes[0].asunto_mensaje,
    text: mensajes[0].mensaje.replace('||1', data.num_pago)
  };
  const transporter1 = await Email.createTransporter();
  await Email.sendMail(transporter1, mailOptions1);

  // envio de correo admin
  var text1 = mensajes[1].mensaje.replace('||1', data.num_pago);
  text1 = text1.replace('||2', `${resp.data[0].nombres_cliente} ${resp.data[0].apellidos_cliente}`);
  text1 = text1.replace('||3', resp.data[0].email);
  text1 = text1.replace('||4', resp.data[0].num_celular);
  const mailOptions2 = {
    from: correo_envia.valor_variable,
    to: user.email,
    subject: mensajes[1].asunto_mensaje,
    text: text1,
  };
  const transporter2 = await Email.createTransporter();
  await Email.sendMail(transporter2, mailOptions2);

  return lista_credito_pago(null, datos.id);

}

/////////////////////////////////////////////////////////////////// servivios de los admin //////////////////////////////////////////////////////////////////

async function lista_creditosxcliente(id) {
  var select = `SELECT c.*, ce.id, cb.nombre_credito_bancos FROM creditos AS c
  INNER JOIN credito_estados AS ce ON ce.id = c.id_credito_estado
  LEFT JOIN credito_bancos AS cb ON cb.id = c.id_banco
  WHERE c.id_cliente = ${id}`;
  var data = await Creditos.sequelize.query(select, { type: QueryTypes.SELECT });
  return ({ successful: true, data: data });
}

async function create_aprobacion_credito(datos) {

  var data = await Creditos.findOne({ where: { id: datos.id } });

  // se actualiza pago
  try {
    await data.update({
      id_credito_estado: datos.id_credito_estado,
      nota_admin: datos.nota_admin,
      fec_desembolso: parseInt(datos.id_credito_estado) === 2 ? moment().format('YYYY-MM-DD') : null
    });
  } catch (error) {
    return {
      successful: false,
      data: "Error Al intentar Guardar en base de datos",
    };
  }

  var select = `SELECT cc.email, ce.nombre_credito_tipo, cc.id_usuario FROM creditos AS c
  INNER JOIN clientes AS cc ON c.id_cliente = cc.id
  INNER JOIN credito_estados as ce ON ce.id =c.id_credito_estado
  WHERE c.id = ${datos.id} LIMIT 1`;
  const consl = await Creditos.sequelize.query(select, { type: QueryTypes.SELECT });

  //credo data y almaceno creando Credito_pago_cuotas
  if (parseInt(datos.id_credito_estado) === 2) {
    const resp = await cotizacion_credito(data);
    var obj = null;
    var array = [];
    resp.data.cuotas.forEach(ele => {
      obj = {
        id_credito: datos.id,
        id_credito_pago_estado: 1,
        id_user_cobra: data.tipo_cobro=='Transferencia'?consl[0].id_usuario:null,
        num_pago: ele.n_cuota,
        fecha_estimada_pago: ele.fecha_pago_cuota,
        fecha_pago: null,
        valor_pagado: null,
        soporte_pago: null,
        nota_admin: null
      };
      array.push(obj);
    });
    await Credito_pago_cuotas.bulkCreate(array);
  }

  //consulta data para envai correo
  const mensajes = await Config_mensajes.findOne({ where:{ id: 9 } });
  const correo_envia = await Config.findOne({ where: { id: 4 } });

  //creo correo y lo envio
  const mailOptions = {
    from: correo_envia.valor_variable,
    to: consl[0].email,
    subject: mensajes.asunto_mensaje,
    text: mensajes.mensaje.replace('||1', consl[0].nombre_credito_tipo)
  };
  const transporter = await Email.createTransporter();
  await Email.sendMail(transporter, mailOptions);
    
  return ({ successful: false, data: data });
}

async function lista_pago_cuotasxuser(id) {
  var select1 = `SELECT 
	  cc.id AS id_credito,
    c.id,
    c.email,
    c.num_celular,
    ci.dpto,
    ci.ciudad,
    CONCAT(ci.nombres_cliente, " ", ci.apellidos_cliente) AS nom_completo,
    ci.direccion,
    num_documento,
    utd.nombre_tipo_doc,
    ci.fecha_nac,
    ci.foto_cliente,
    ct.nombre_tipo_cliente,
    ce.nombre_credito_tipo,
    cc.num_cuenta,
    cc.tipo_cobro,
    cc.num_cuotas,
    cc.valor_credito,
    cc.valor_interes,
    cc.valor_interes_mora,
    cc.frecuencia_cobro,
    cc.fec_desembolso,
    cb.nombre_credito_bancos
  FROM clientes AS c
  INNER JOIN cliente_infos AS ci ON c.id = ci.id_cliente
  INNER JOIN user_tipo_docs AS utd ON utd.id = ci.id_user_tipo_doc
  INNER JOIN cliente_tipos AS ct ON ct.id = c.id_cliente_tipo
  INNER JOIN creditos AS cc ON c.id = cc.id_cliente
  INNER JOIN credito_estados AS ce ON ce.id = cc.id_credito_estado
  INNER JOIN credito_bancos AS cb ON cb.id = cc.id_banco
  WHERE c.id_cliente_tipo = 2 AND 
  cc.id_credito_estado = 2 AND 
  c.id_usuario = ${id}`;
  const cliente_array = await Creditos.sequelize.query(select1, { type: QueryTypes.SELECT });

  var select1 = `SELECT cpe.nombre_estado_pago, cpc.* FROM credito_pago_cuotas AS cpc 
  INNER JOIN credito_pago_estados AS cpe ON cpc.id_credito_pago_estado = cpe.id
  INNER JOIN creditos AS c ON c.id = cpc.id_credito
  WHERE cpc.id_user_cobra = ${id}`;
  const pagos_cuotas = await Creditos.sequelize.query(select1, { type: QueryTypes.SELECT });

}