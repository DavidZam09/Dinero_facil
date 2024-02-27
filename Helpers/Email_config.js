const nodemailer = require("nodemailer");
const Config = require("../Creditos/Model_config");

// Configuración del transporte de correo
function createTransporter() {
// Configuración del servidor de correo
const smtpConfig = {
    host: 'smtp.example.com',
    port: 587,
    secure: false, // true para SSL, false para TLS
    auth: {
        user: 'tu_correo@example.com',
        pass: 'tu_contraseña'
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
