const sequelize = require('../../Helpers/Config_db');
const { DataTypes } = require("sequelize");

const Tipo_doc = sequelize.define("cliente_tipo", {
  nombre_tipo_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Tipo_doc;