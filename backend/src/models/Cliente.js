const Sequelize = require('sequelize');
const database = require("../config/db_config.js");

const Cliente = database.define("cliente", {
    cliente_id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    coordenada_x: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    coordenada_y: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },  
}, {
    timestamps: false
});

module.exports = Cliente;