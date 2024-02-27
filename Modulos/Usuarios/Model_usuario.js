const sequelize = require('../../Helpers/Config_db');
const { DataTypes } = require("sequelize");
const Rol = require('./Model_rol');
const Tipo_doc = require('./Model_tipo_doc');

const User = sequelize.define("users", {
    id_user_tipo_doc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tipo_doc,
            key: 'id'
        }
    },
    id_user_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rol,
            key: 'id'
        }
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    num_celular: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    num_doc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});

module.exports = User;