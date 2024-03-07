const sequelize = require("../../Helpers/Config_db");
const { DataTypes } = require("sequelize");

const Credito_pago_estados = sequelize.define("credito_pago_estados", {
  nombre_estado_pago: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Credito_pago_estados;
