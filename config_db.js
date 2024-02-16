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

/*
      // Crear una tabla para almacenar los datos de los usuarios
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS usuarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          foto_usuario VARCHAR(255) NOT NULL,
          foto_documento VARCHAR(255) NOT NULL
        )
      `;
      connection.query(createTableQuery, (err, result) => {
        if (err) {
          console.error('Error al crear la tabla:', err);
          throw err;
        }
        console.log('Tabla creada exitosamente o ya existente.');
      });
*/


db.authenticate()
.then((result) => {
  console.log("Connection established.");
})
.catch((error) => {
  console.log("Unable to connect to db: ", error);
});

module.exports = db;