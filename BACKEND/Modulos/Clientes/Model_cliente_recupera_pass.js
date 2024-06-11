const sequelize = require('../../Helpers/Config_db');
const { DataTypes } = require("sequelize");
const Cliente = require('./Model_cliente')

const Cliente_recupera_pass = sequelize.define("cliente_cambia_password", {
    id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
            model: Cliente,
            key: 'id'
        }
    },
    cod_recupera: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Cliente_recupera_pass;