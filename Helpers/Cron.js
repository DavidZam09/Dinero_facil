const Config = require("../Modulos/Creditos/Model_config");
const Email = require("./Email_config");

const Config_mensajes = require("../Modulos/Creditos/Model_config_mensaje");
const Cliente = require("../Modulos/Clientes/Model_cliente");
const Creditos = require("../Modulos/Creditos/Model_creditos");
const Credito_pago_cuotas = require("../Modulos/Creditos/Model_credito_pago_cuotas");

//test Cron
const test = async () => {
  const correo_envia = await Config.findOne({ where: { id: 4 } });
  const mailOptions = {
    from: correo_envia.valor_variable,
    to: correo_envia.valor_variable,
    subject: "Test Cron",
    text: "Prueba del Cron"
  };
  const transporter = await Email.createTransporter();
  await Email.sendMail(transporter, mailOptions);
};

//asignacion de colaborador a credito pago
const Signar_Cobrador = async () => {

  const select1 = `SELECT cpc.*, (c.valor_credito / c.num_cuotas) + c.valor_interes as val_cuota, 
  cc.email from credito_pago_cuotas as cpc 
  inner join creditos as c on cpc.id_credito = c.di
  inner join clientes as cc on c.id_cliente = cc.id
  where cpc.id_user_cobra is null and 
  cpc.fecha_estimada_pago = date_add(NOW(), INTERVAL -1 DAY)`;
  const cobro_no_asignados = await Creditos.sequelize.query(select1, { type: QueryTypes.SELECT });

  const select2 = `SELECT * from users where id_rol = 2`;
  const lista_colaboradores = await Creditos.sequelize.query(select2, { type: QueryTypes.SELECT });

  const cant = lista_colaboradores.length;
  const cont = 0;
  cobro_no_asignados.forEach(async ele => {
    const pago_cuota = await Credito_pago_cuotas.findOne({ where: { id: ele.id } });
    await pago_cuota.update({id_user_cobra: lista_colaboradores[cont].id});
    cont++;
    if( cant === cont ){
      cont = 0;
    }
  });


  const correo_envia = await Config.findOne({ where: { id: 4 } });
  const mailOptions = {
    from: correo_envia.valor_variable,
    to: correo_envia.valor_variable,
    subject: "Test Cron",
    text: "Prueba del Cron"
  };
  const transporter = await Email.createTransporter();
  await Email.sendMail(transporter, mailOptions);
  //console.log("Tarea ejecutada a las 8:31 AM");
};

module.exports = {
  test,
  Signar_Cobrador
};

