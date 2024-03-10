const { QueryTypes } = require("sequelize");
const SQL = require("sequelize");
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
  un_credito
};

/* servivios de Creditos */

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
  console.log(select);
  var data = await Creditos.sequelize.query(select, { type: QueryTypes.SELECT });
  return ({ successful: true, data: data });
}

async function input_credito(datos) {

  var obj = {
    id: datos.id,
    id_credito_estado: 1,
    id_credito_estado: datos.id_credito_estado,
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
  }

  if ((datos.tipo_cobro === 'Efectivo')) {
    datos.id_banco = null;
    datos.tipo_cuenta = null;
    datos.num_cuenta = null;
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
      id: data,
      id_cliente_tipo: { [Sequelize.Op.in]: [4, 5] }
    }
  })

  // envio de correo cliente
  var text = mensajes[0].mensajes.replace('||1', titulo);
  text = text.replace('||2', valor_prestamo)
  const mailOptions1 = {
    from: correo_envia.valor_variable,
    to: resp.data[0].email,
    subject: titulo + mensajes[0].asunto_mensaje,
    text: text
  };
  const transporter1 = await Email.createTransporter();
  await Email.sendMail(transporter1, mailOptions1);

  // envio de correo admin
  var text1 = mensajes[1].asunto_mensaje.replace('||1', valor_prestamo);
  text1 = mensajes[1].asunto_mensaje.replace('||2', `${resp.data[0].nombres_cliente} ${resp.data[0].apellidos_cliente}`);
  text1 = mensajes[1].asunto_mensaje.replace('||3', resp.data[0].email);
  text1 = mensajes[1].asunto_mensaje.replace('||4', resp.data[0].num_celular);
  const mailOptions2 = {
    from: correo_envia.valor_variable,
    to: user.email,
    subject: mensajes[0].asunto_mensaje.replace('||1', titulo),
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

  const { num_cuotas, fecha_desembolso } = req;
  const { valor_prestamo, frecuencia_cobro, interes, interes_mora } = await Creditos_cotizacion.findOne({ where: { id: req.id } });

  const dias = frecuencia_cobro === 'Semanal' ? 7 : 15;
  var array_cuotas = [];
  var total = null;
  var fecha_carry = fecha_desembolso;

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
      fecha_desembolso: fecha_desembolso,
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
      id: data,
      id_cliente_tipo: { [Sequelize.Op.in]: [6, 7] }
    }
  })

  // envio de correo cliente
  const mailOptions1 = {
    from: correo_envia.valor_variable,
    to: resp.data[0].email,
    subject: mensajes[0].asunto_mensaje,
    text: mensajes[0].mensajes.replace('||1', data.num_pago)
  };
  const transporter1 = await Email.createTransporter();
  await Email.sendMail(transporter1, mailOptions1);

  // envio de correo admin
  var text1 = mensajes[0].asunto_mensaje.replace('||1', data.num_pago);
  text1 = mensajes[0].asunto_mensaje.replace('||2', `${resp.data[0].nombres_cliente} ${resp.data[0].apellidos_cliente}`);
  text1 = mensajes[0].asunto_mensaje.replace('||3', resp.data[0].email);
  text1 = mensajes[0].asunto_mensaje.replace('||4', resp.data[0].num_celular);
  const mailOptions2 = {
    from: correo_envia.valor_variable,
    to: user.email,
    subject: mensajes[0].asunto_mensaje.replace('||1', titulo),
    text: text1,
  };
  const transporter2 = await Email.createTransporter();
  await Email.sendMail(transporter2, mailOptions2);

  return lista_credito_pago(null, datos.id);

}