const sequelize = require("../../Helpers/Config_db");
const { DataTypes } = require("sequelize");
const Credito = require('./Model_creditos');
const Credito_pago_estados = require('./Model_credito_pago_estados');

const Credito_pago_cuotas = sequelize.define("credito_pago_cuotas", {
  id_credito: {
    type: DataTypes.INTEGER,
    allowNull: false,
        references: {
        model: Credito,
        key: 'id'
    }
  },
  id_credito_pago_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
        references: {
        model: Credito_pago_estados,
        key: 'id'
    }
  }, 
  num_pago: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  nota_admin: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Credito_pago_cuotas;
