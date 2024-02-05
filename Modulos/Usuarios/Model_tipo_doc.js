const sequelize = require('../../config_db');
const { DataTypes } = require("sequelize");

const Tipo_doc = sequelize.define("user_tipo_docs", {
    nombre_tipo_doc: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Tipo_doc;