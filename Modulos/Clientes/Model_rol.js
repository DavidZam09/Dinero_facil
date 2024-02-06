const sequelize = require('../../config_db');
const { DataTypes } = require("sequelize");

const Rol = sequelize.define("user_rol", {
  nombre_rol: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Rol;


