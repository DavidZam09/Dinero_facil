const Sequelize = require("sequelize");

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