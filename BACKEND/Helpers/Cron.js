const Config = require("../Modulos/Creditos/Model_config");
const Email = require("./Email_config");
const { QueryTypes } = require("sequelize");

const Config_mensajes = require("../Modulos/Creditos/Model_config_mensaje");
const Creditos = require("../Modulos/Creditos/Model_creditos");
const Credito_pago_cuotas = require("../Modulos/Creditos/Model_credito_pago_cuotas");

//test Cron
const test = async () => {
  const correo_envia = await Config.findOne({ where: { id: 4 } });
  const mailOptions = {
    from: correo_envia.valor_variable,
    to: correo_envia.valor_variable,
    subject: "Test Cron",
    text: "Prueba del Cron",
  };
  const transporter = await Email.createTransporter();
  await Email.sendMail(transporter, mailOptions);
};

//asignacion de colaborador a credito pago
const Asignar_Cobrador = async () => {
  // consulto cobros en efectivos de proximos a 2 dias
  const select1 = `SELECT cpc.*, (c.valor_credito / c.num_cuotas) + c.valor_interes as val_cuota, 
  cc.email, cc.num_celular, CONCAT(ci.nombres_cliente, " ", ci.apellidos_cliente) AS nom_compleo  
  from credito_pago_cuotas as cpc 
  inner join creditos as c on cpc.id_credito = c.id
  inner join clientes as cc on c.id_cliente = cc.id
  inner join cliente_infos as ci on cc.id = ci.id_cliente
  where cpc.id_user_cobra is null and 
  cpc.fecha_estimada_pago = DATE( date_add(NOW(), INTERVAL +2 DAY))`;
  const cobro_no_asignados = await Creditos.sequelize.query(select1, {
    type: QueryTypes.SELECT,
  });

  //consulto users colaboradores
  const select2 = `SELECT * from users where id_user_rol = 2 and activo = 'SI'`;
  const lista_colaboradores = await Creditos.sequelize.query(select2, {
    type: QueryTypes.SELECT,
  });

  const cant = lista_colaboradores.length;
  var cont = 0;
  var array = [];

  //asigno colaboradores
  await cobro_no_asignados.forEach(async (ele) => {
    const pago_cuota = await Credito_pago_cuotas.findOne({
      where: { id: ele.id },
    });
    await pago_cuota.update({ id_user_cobra: lista_colaboradores[cont].id });
    cont++;
    if (cant === cont) {
      cont = 0;
    }
  });

  //creo data para envio de correo
  cobro_no_asignados.forEach((ele2) => {
    ele2.colaborador = lista_colaboradores[cont];
    array.push(ele2);
    cont++;
    if (cant === cont) {
      cont = 0;
    }
  });

  //envio de correos
  const correo_envia = await Config.findOne({ where: { id: 4 } });
  const mensajes = await Config_mensajes.findOne({ where: { id: 12 } });
  array.forEach(async (ele3) => {
    var mesg = mensajes.mensaje.replace("||1", ele3.nom_compleo);
    mesg = mesg.replace("||2", ele3.email);
    mesg = mesg.replace("||3", ele3.num_celular);
    const mailOptions = {
      from: correo_envia.valor_variable,
      to: ele3.colaborador.email,
      subject: mensajes.asunto_mensaje,
      text: mesg,
    };
    const transporter = await Email.createTransporter();
    await Email.sendMail(transporter, mailOptions);
  });
  console.log("Tarea ejecutada a las 8:00 AM");
};

//aviso credito pago
const Recordatorio_pago_cobro = async () => {
  // consulto cobros hoy
  const select1 = `SELECT cpc.*, (c.valor_credito / c.num_cuotas) + c.valor_interes as val_cuota, 
  c.valor_credito, c.num_cuotas,
  cc.email, cc.num_celular, CONCAT(ci.nombres_cliente, " ", ci.apellidos_cliente) AS nom_compleo  
  from credito_pago_cuotas as cpc 
  inner join creditos as c on cpc.id_credito = c.id
  inner join clientes as cc on c.id_cliente = cc.id
  inner join cliente_infos as ci on cc.id = ci.id_cliente
  where cpc.id_user_cobra IS not null and cpc.id_credito_pago_estado IN (1, 4)
  and cpc.fecha_estimada_pago = DATE( NOW() )`;
  const aviso_clientes = await Creditos.sequelize.query(select1, {
    type: QueryTypes.SELECT,
  });

  //envio de correos
  const correo_envia = await Config.findOne({ where: { id: 4 } });
  const mensajes = await Config_mensajes.findOne({ where: { id: 13 } });
  /*const mensajes = await Config_mensajes.findAll({
    where:{
       id: { [QueryTypes.in]: [12, 13] }
    }
  });*/

  const options1 = { style: "currency", currency: "COP" };
  const numberFormat1 = new Intl.NumberFormat("es-CO", options1);
  aviso_clientes.forEach(async (ele) => {
    var mesg = mensajes.mensaje.replace(
      "||1",
      numberFormat1.format(ele.valor_credito)
    );
    mesg = mesg.replace("||2", ele.num_cuotas);
    mesg = mesg.replace("||3", numberFormat1.format(ele.val_cuota));
    const mailOptions = {
      from: correo_envia.valor_variable,
      to: ele.email,
      subject: mensajes.asunto_mensaje,
      text: mesg,
    };
    const transporter = await Email.createTransporter();
    await Email.sendMail(transporter, mailOptions);
  });
  console.log("Tarea ejecutada a las 8:00 AM");
};

//aviso credito pago
const Aviso_mora_pago_cuota = async () => {
  // consulto cobros en mora
  const select1 = `SELECT cpc.*, (c.valor_credito / c.num_cuotas) + c.valor_interes + c.valor_interes_mora as val_cuota, 
  c.valor_credito, c.num_cuotas, c.valor_interes_mora, DATEDIFF( DATE(NOW()),  cpc.fecha_estimada_pago ) AS dias_mora,
  cc.email, cc.num_celular, CONCAT(ci.nombres_cliente, " ", ci.apellidos_cliente) AS nom_compleo  
  from credito_pago_cuotas as cpc 
  inner join creditos as c on cpc.id_credito = c.id
  inner join clientes as cc on c.id_cliente = cc.id
  inner join cliente_infos as ci on cc.id = ci.id_cliente
  where cpc.id_user_cobra IS not null and cpc.id_credito_pago_estado IN (1, 4)
  and cpc.fecha_estimada_pago < DATE(NOW())`;
  const aviso_clientes = await Creditos.sequelize.query(select1, {
    type: QueryTypes.SELECT,
  });

  //envio de correos
  const correo_envia = await Config.findOne({ where: { id: 4 } });
  const mensajes = await Config_mensajes.findOne({ where: { id: 14 } });

  const options1 = { style: "currency", currency: "COP" };
  const numberFormat1 = new Intl.NumberFormat("es-CO", options1);
  aviso_clientes.forEach(async (ele) => {
    var mesg = mensajes.mensaje.replace( "||1", numberFormat1.format(ele.valor_credito) );
    mesg = mesg.replace("||2", ele.num_cuotas);
    mesg = mesg.replace("||3", numberFormat1.format(ele.valor_interes_mora));
    mesg = mesg.replace("||4", ele.dias_mora);
    mesg = mesg.replace("||5", numberFormat1.format(ele.val_cuota));
    const mailOptions = {
      from: correo_envia.valor_variable,
      to: ele.email,
      subject: mensajes.asunto_mensaje,
      text: mesg,
    };
    const transporter = await Email.createTransporter();
    await Email.sendMail(transporter, mailOptions);
  });
  console.log("Tarea ejecutada a las 8:00 AM");
};

module.exports = {
  test,
  Asignar_Cobrador,
  Recordatorio_pago_cobro,
  Aviso_mora_pago_cuota
};
