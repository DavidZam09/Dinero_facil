const sequelize = require('../../Helpers/Config_db');
const { DataTypes } = require("sequelize");

const Credito_estados = sequelize.define("credito_estados", {
  nombre_credito_tipo: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Credito_estados;