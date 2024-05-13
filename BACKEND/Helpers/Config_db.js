const Sequelize = require("sequelize");

//desarrollo
/*const db = new Sequelize('dinero_facil', 'dinero_facil', "eRF_UcsB5fjM3Sn", {
  dialect: "mysql",
  host: 'localhost',
});*/

//produccion
const db = new Sequelize('dinero_facil', 'root', null, {
  dialect: "mysql",
  host: 'localhost',
});

db.authenticate()
.then((result) => {
  console.log("Connection established.");
})
.catch((error) => {
  console.log("Unable to connect to db: ", error);
});

module.exports = db;