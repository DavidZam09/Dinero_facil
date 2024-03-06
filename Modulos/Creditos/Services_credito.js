const { QueryTypes } = require("sequelize");
const SQL = require("sequelize");

const Bancos = require("./Model_credito_bancos");
const Credito_estados = require("./Model_credito_estados");
const Creditos= require("./Model_creditos");
const Creditos_cotizacion = require("./Model_credito_cotizacion");

module.exports = {
  lista_bancos,
  lista_credito_estados,
  un_credito,
  input_credito,
  lista_credito_cotizacion,
  cotizacion_credito,
  cotizacion_credito,
  input_credito_cotizacion
};

/* servivios de Creditos */

async function lista_bancos() {
  return { successful: true, data: await Bancos.findAll() };
}

async function lista_credito_estados() {
  return { successful: true, data: await Credito_estados.findAll() };
}

async function un_credito( id ) {
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

async function input_credito( datos ) {

  if( ( datos.id === '' ) || ( datos.id === null ) ){
    datos.id_credito_estado = 1;
    datos.id_banco = null;
    datos.id_usuario_asignado = null;
    datos.fec_desembolso = null;
    datos.fec_pazysalvo = null;
  }

  if( ( datos.entrega_en_efectivo === 'SI' ) ){
    datos.id_banco = null;
    datos.fec_desembolso = null;
    datos.fec_pazysalvo = null;
    datos.tipo_cuenta = null;
    datos.num_cuenta = null;
  }

  var obj = {
    id: datos.id,
    id_credito_estado : datos.id_credito_estado,
    id_banco: datos.id_banco,
    id_usuario_asignado: datos.id_usuario_asignado,
    id_cliente: datos.id_cliente,
    valor_credito: datos.valor_credito,
    tipo_cobro: datos.tipo_cobro,
    entrega_en_efectivo: datos.entrega_en_efectivo,
    num_cuenta: datos.num_cuenta,
    tipo_cuenta: datos.tipo_cuenta,
    periodicidad_cobro: datos.periodicidad_cobro,
    num_cuotas: datos.num_cuotas,
    nota_cliente: datos.nota_cliente,
    fec_desembolso: datos.fec_desembolso,
    fec_pazysalvo: datos.fec_pazysalvo
  }

  var data = null;
  try {
    if (datos.id === "" || datos.id === null){
      data = await Creditos.create(obj);
    }else{
      data = await Creditos.findOne({ where: { id: datos.id } });
      data.update(obj);
    }
  } catch (error) {
    return {
      successful: false,
      data: "Error Al intentar Guardar en base de datos",
    };
  }

  await un_credito( data.id );
}

async function lista_credito_cotizacion() {
  return { successful: true, data: await Creditos_cotizacion.findAll() };
}

async function cotizacion_credito( req ) {

  const { num_cuotas, fecha_desembolso} = req;
  const { valor_prestamo, frecuencia_cobro, interes, interes_mora} = await Creditos_cotizacion.findOne({ where: { id: req.id } });

  const dias = frecuencia_cobro ==='Semanal'? 7 : 15;
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
      cuota: valor_prestamo/num_cuotas,
      interes: interes,
      subtotal: valor_prestamo/num_cuotas + interes,
      fecha_pago_cuota: fecha_carry
    };
    array_cuotas.push(obj);
    total += valor_prestamo/num_cuotas + interes;
  }
  return { successful: true, data: {
    valor_prestamo: valor_prestamo,
    interes_mora: interes_mora,
    interes: interes,
    total_pagado: total,
    num_cuotas: num_cuotas,
    fecha_desembolso: fecha_desembolso,
    frecuencia_cobro: frecuencia_cobro,
    cuotas: array_cuotas
  }};
}


async function input_credito_cotizacion( datos ) {

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
}
