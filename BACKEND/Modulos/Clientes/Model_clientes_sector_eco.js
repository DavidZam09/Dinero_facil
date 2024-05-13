const sequelize = require('../../Helpers/Config_db');
const { DataTypes } = require("sequelize");

const Sector_eco = sequelize.define("cliente_sector_ecos", {
  nombre_sector_eco: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Sector_eco;