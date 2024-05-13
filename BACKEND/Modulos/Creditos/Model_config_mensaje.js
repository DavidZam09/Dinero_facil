const sequelize = require("../../Helpers/Config_db");
const { DataTypes } = require("sequelize");

const Config_mensajes = sequelize.define("config_mensajes", {
  nom_mensaje: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asunto_mensaje: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mensaje: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_mensaje: {
    type: DataTypes.ENUM('Correo', 'Whatsapp'),
    allowNull: false,
    defaultValue: 'Correo'
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
module.exports = Config_mensajes;
