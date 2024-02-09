const sequelize = require('../../config_db');
const { DataTypes } = require("sequelize");
const Cliente = require('./Model_cliente');
const Tipo_doc = require('../Usuarios/Model_tipo_doc');
const Actividad_eco = require('./Model_clientes_actividad_eco');
const Sector_eco = require('./Model_clientes_sector_eco');


const cliente_info = sequelize.define("cliente_info", {
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Cliente,
        key: 'id'
    }
  },
  id_dpto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  id_ciudad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user_tipo_doc: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Tipo_doc,
        key: 'id'
    }
  },
  id_cliente_actividad_eco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Actividad_eco,
        key: 'id'
    }
  },
  id_cliente_sector_eco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Sector_eco,
        key: 'id'
    }
  },
  nombres_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nac: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_documento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otro_sector_y_actividad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre_empresa_labora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingreso_mesual: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gasto_mensual: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  foto_doc_frontal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto_doc_trasera: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto_recivo_publico: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto_pago_nomina: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tratamiento_datos: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  terminos_y_condiciones: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  rf1_nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rf1_num_celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rf1_direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rf2_nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rf2_num_celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rf2_direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = cliente_info;