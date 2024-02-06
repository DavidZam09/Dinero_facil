const sequelize = require('../../config_db');
const { DataTypes } = require("sequelize");
const Cliente_tipos = require('./Model_clientes_tipo');
//const Tipo_doc = require('./Model_clientes_tipo');

const Cliente = sequelize.define("cliente", {
    id_cliente_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente_tipos,
            key: 'id'
        }
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