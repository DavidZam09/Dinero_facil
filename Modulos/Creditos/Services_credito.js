const { QueryTypes } = require("sequelize");
const SQL = require("sequelize");

const Bancos = require("./Model_credito_bancos");
const Credito_estados = require("./Model_credito_estados");
const Creditos= require("./Model_creditos");

module.exports = {
  lista_bancos,
  lista_credito_estados,
  input_credito
};

/* servivios de Creditos */

async function lista_bancos() {
  return { successful: true, data: await Bancos.findAll() };
}

async function lista_credito_estados() {
  return { successful: true, data: await Credito_estados.findAll() };
}
