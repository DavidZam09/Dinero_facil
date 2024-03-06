const sequelize = require("../../Helpers/Config_db");
const { DataTypes } = require("sequelize");

const Config = sequelize.define("credito_pago_estados", {
  nombre_estado_pago: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = true;
