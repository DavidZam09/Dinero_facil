const sequelize = require('../../Helpers/Config_db');
const { DataTypes } = require("sequelize");
const Credito_bancos = require('./Model_credito_bancos');
const Credito_estados = require('./Model_credito_estados');
const Usuario = require('../Usuarios/Model_usuario');
const Cliente = require('../Clientes/Model_cliente');

const Tipo_doc = sequelize.define("credito", {
  id_credito_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
        references: {
        model: Credito_estados,
        key: 'id'
    }
  }, 
   id_banco: {
    type: DataTypes.INTEGER,
    allowNull: true,
      references: {
        model: Credito_bancos,
        key: 'id'
    }
  }, 
  id_usuario_asignado: {
    type: DataTypes.INTEGER,
    allowNull: true,
      references: {
        model: Usuario,
        key: 'id'
    }
  }, 
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
      references: {
        model: Cliente,
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
  tipo_cobro: {
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
  periodicidad_cobro: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  num_cuotas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nota_cliente: {
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
  }
  
});

module.exports = Tipo_doc;