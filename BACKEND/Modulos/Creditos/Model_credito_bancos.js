const sequelize = require('../../Helpers/Config_db');
const { DataTypes } = require("sequelize");

const Credito_bancos = sequelize.define("credito_bancos", {
  nombre_credito_bancos: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Credito_bancos;