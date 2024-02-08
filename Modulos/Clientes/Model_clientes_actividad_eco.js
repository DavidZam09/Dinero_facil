const sequelize = require('../../config_db');
const { DataTypes } = require("sequelize");

const Actividad_eco = sequelize.define("cliente_actividad_eco", {
  nombre_actividad_eco: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Actividad_eco;