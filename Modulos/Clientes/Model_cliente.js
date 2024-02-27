const sequelize = require('../../Helpers/Config_db');
const { DataTypes } = require("sequelize");
const Cliente_tipos = require('./Model_clientes_tipo');
const User = require('../Usuarios/Model_usuario');

const Cliente = sequelize.define("cliente", {
    id_cliente_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente_tipos,
            key: 'id'
        }
    },
    id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
            model: User,
            key: 'id'
        }
    },
    fecha_aprobacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    num_celular: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cod_referido: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cod_personal: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

module.exports = Cliente;