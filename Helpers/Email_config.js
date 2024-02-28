const nodemailer = require("nodemailer");
const Config = require("../Modulos/Creditos/Model_config");

// Configuración del transporte de correo
async function createTransporter() {
  
// Configuración del servidor de correo
const config = await Config.findAll();
const correo_host = config[0].valor_variable;
const correo_port = config[1].valor_variable;
const correo_secure = config[2].valor_variable;
const correo_auth_user = config[3].valor_variable;
const correo_auth_pass = config[4].valor_variable;

const smtpConfig = {
    host: correo_host,
    port: correo_port,
    secure: correo_secure?true:false, // true para SSL, false para TLS
    auth: {
        user: correo_auth_user,
        pass: correo_auth_pass
    }
};

  return nodemailer.createTransport(smtpConfig);
}

// Función para enviar el correo electrónico
async function sendMail(transporter, mailOptions) {
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente:", info.response);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
}

module.exports = {
  createTransporter,
  sendMail,
};
