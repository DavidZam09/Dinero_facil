const sequelize = require('../../Helpers/Config_db');
const { DataTypes } = require("sequelize");
const Credito_bancos = require('./Model_credito_bancos');
const Credito_estados = require('./Model_credito_estados');

const Tipo_doc = sequelize.define("credito", {
  id_credito_estados: {
    type: DataTypes.STRING,
    allowNull: true,
        references: {
        model: Credito_estados,
        key: 'id'
    }
  }, 
   id_banco: {
    type: DataTypes.STRING,
    allowNull: true,
      references: {
        model: Credito_bancos,
        key: 'id'
    }
  }, 
  valor_credito: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  entrega_en_efectivo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  num_cuenta: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  tipo_cuenta: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fec_desembolso: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fec_pazysalvo: {
    type: DataTypes.DATE,
    allowNull: true
  },
});

module.exports = Tipo_doc;