const sequelize = require("../../Helpers/Config_db");
const { DataTypes } = require("sequelize");

const Config = sequelize.define("credito_cotizacions", {
  valor_prestamo: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  frecuencia_cobro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interes: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  interes_mora: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  activo: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Config;
