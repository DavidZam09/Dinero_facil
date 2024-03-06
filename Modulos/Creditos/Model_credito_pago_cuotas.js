const sequelize = require("../../Helpers/Config_db");
const { DataTypes } = require("sequelize");
const Credito = require('./Model_creditos');

const Config = sequelize.define("credito_pago_cuotas", {
  id_credito: {
    type: DataTypes.INTEGER,
    allowNull: false,
        references: {
        model: Credito,
        key: 'id'
    }
  }, 
  fecha_estimada_pago: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_pago: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valor_pagado: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }, 
  soporte_pago: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = true;
