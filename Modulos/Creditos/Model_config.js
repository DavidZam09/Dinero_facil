const sequelize = require("../../Helpers/Config_db");
const { DataTypes } = require("sequelize");

const Config = sequelize.define("config", {
  nom_variable: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor_variable: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Config;
