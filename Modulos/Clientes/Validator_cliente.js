const { body, check } = require("express-validator");
const Sequelize = require("sequelize");

const Cliente_info = require("./Model_clientes_info");
const Cliente_act_eco = require("./Model_clientes_actividad_eco");
const Cliente_sec_eco = require("./Model_clientes_sector_eco");
const Cliente = require('./Model_cliente');

const Tipo_doc = require("../Usuarios/Model_tipo_doc");
const User = require("../Usuarios/Model_usuario");

/////////////////////////////////////////////////////////////////// validaciones para los Clientes //////////////////////////////////////////////////////////////////


const registrar_cliente = [
   check("cod_referido").exists().withMessage("La variable Password no existe"),
   check("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("El campo debe tener entre 6 y 16 caracteres"),
   check("password")
      .matches(/^(?=.*[A-Z])(?=.*\d).+$/)
      .withMessage(
         "El campo debe contener al menos una letra mayúscula y un número"
      ),
   check("num_celular", "Invalid num_celular")
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            Cliente.findOne({ where: { num_celular: data } }).then((Exist) => {
               if (Exist !== null) {
                  reject(new Error("num_celular ya existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
   check("email").isEmail().withMessage("Solo se admiten correos"),
   check("email", "Invalid Email")
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            Cliente.findOne({ where: { email: data } }).then((Exist) => {
               if (Exist !== null) {
                  reject(new Error("Email ya existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
];

const login_cliente = [
   check("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("El campo debe tener entre 6 y 16 caracteres"),
   check("password")
      .matches(/^(?=.*[A-Z])(?=.*\d).+$/)
      .withMessage(
         "El campo debe contener al menos una letra mayúscula y un número"
      ),
   body("email").isEmail().withMessage("Solo se admiten correos"),
   body("email", "Invalid Email")
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            Cliente.findOne({ where: { email: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Email no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
];

const lista_cliente_infoxcliente = [
   check("id", "Invalido Cliente")
      .isInt()
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            Cliente.findOne({ where: { id: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Cliente no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
];

const input_cliente_info = [
   body('id', "Invalido Cliente_info")
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            if ((data === '') || (data === null)) {
               resolve(true);
            } else {
               Cliente_info.findOne({ where: { id: data } }).then((Exist) => {
                  if (Exist === null) {
                     reject(new Error("Cliente no existe."));
                  } else {
                     resolve(true);
                  }
               });
            }
         });
      }),
   body("id_cliente", "Invalido Cliente")
      .isInt()
      .exists()
      .custom(async (data, { req }) => {
         return new Promise(async (resolve, reject) => {
            if ((req.body.id === '') || (req.body.id === null)) {
               const cliente_info = await Cliente_info.findOne({ where: { id_cliente: data } })
               if ((cliente_info === '') || (cliente_info === null)) {
                  const cliente = await Cliente.findOne({
                     where:
                     {
                        id: data,
                        id_cliente_tipo: { [Sequelize.Op.in]: [1, 4] }
                     }
                  })
                  if (cliente !== null) {
                     resolve(true);
                  } else {
                     reject(new Error("El Cliente debe estar en estado Nuevo o Imcompleto."));
                  }
               } else {
                  reject(new Error("Cliente_info ya existe."));
               }
            } else {
               const cliente_info = await Cliente_info.findOne({ where: { id_cliente: data, id: req.body.id } })
               if (cliente_info === null) {
                  reject(new Error("Cliente_info no existe o es erroneo."));
               } else {
                  const cliente = await Cliente.findOne({
                     where:
                     {
                        id: data,
                        id_cliente_tipo: { [Sequelize.Op.in]: [1, 4] }
                     }
                  })
                  if (cliente !== null) {
                     resolve(true);
                  } else {
                     reject(new Error("El Cliente debe estar en estado Nuevo o Imcompleto."));
                  }
               }
            }
         });
      }),
   body("id_cliente_actividad_eco", "Invalido Actividad Economica")
      .isInt()
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            Cliente_act_eco.findOne({ where: { id: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Actividad Economica no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
   body("id_cliente_sector_eco", "Invalido Sector Economico")
      .isInt()
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            Cliente_sec_eco.findOne({ where: { id: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Sector Economico no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
   body('id_user_tipo_doc', 'Invalido Tipo Documento').isInt().exists().custom(data => {
      return new Promise((resolve, reject) => {
         Tipo_doc.findOne({ where: { id: data } })
            .then(Exist => {
               if (Exist === null) {
                  reject(new Error('Tipo Documento no existe.'))
               } else {
                  resolve(true)
               }
            })
      })
   }),
   body("id_dpto").isInt().withMessage("Solo se admiten numero enteros"),
   body("id_ciudad").isInt().withMessage("Solo se admiten numero enteros"),
   body('nombres_cliente').notEmpty().withMessage('variable no existe o es nula'),
   body('apellidos_cliente').notEmpty().withMessage('variable no existe o es nula'),
   body('fecha_nac').notEmpty().isISO8601('yyyy-mm-dd').toDate().withMessage('Solo se permite fecha con el formato YYY-MM-DD'),
   body('direccion').notEmpty().withMessage('variable no existe o es nula'),
   body('num_documento').isLength({ min: 6, max: 20 }).withMessage("El campo debe tener entre 6 y 20 caracteres"),
   body('otro_sector_y_actividad').exists().withMessage('variable no existe'),
   body('nombre_empresa_labora').notEmpty().withMessage('variable no existe o es nula'),
   body("ingreso_mesual").isInt().withMessage("Solo se admiten numero enteros"),
   body("gasto_mensual").isInt().withMessage("Solo se admiten numero enteros"),
   body('tratamiento_datos').isInt({ min: 0, max: 1 }).withMessage("El campo debe tener entre 0 y 1 caracteres"),
   body('terminos_y_condiciones').isInt({ min: 0, max: 1 }).withMessage("El campo debe tener entre 0 y 1 caracteres"),
   body("rf1_nombre_completo").notEmpty().withMessage('variable no existe o es nula'),
   body("rf1_num_celular").notEmpty().withMessage('variable no existe o es nula'),
   body("rf1_direccion").notEmpty().withMessage('variable no existe o es nula'),
   body("rf2_nombre_completo").notEmpty().withMessage('variable no existe o es nula'),
   body("rf2_num_celular").notEmpty().withMessage('variable no existe o es nula'),
   body("rf2_direccion").notEmpty().withMessage('variable no existe o es nula')
];

/////////////////////////////////////////////////////////////////// validaciones para los admin //////////////////////////////////////////////////////////////////

const lista_clientesxadmin = [
   check("id", "Invalido Usuario")
      .isInt()
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            User.findOne({ where: { id: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Usuario no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
   ];

   const update_aprobacion_cliente = [
      check("id", "Invalido Usuario")
         .isInt()
         .exists()
         .custom((data) => {
            return new Promise((resolve, reject) => {
               User.findOne({ where: { id: data } }).then((Exist) => {
                  if (Exist === null) {
                     reject(new Error("Usuario no existe."));
                  } else {
                     resolve(true);
                  }
               });
            });
         }),
      ];

module.exports = {
   registrar_cliente,
   login_cliente,
   lista_cliente_infoxcliente,
   input_cliente_info,
   lista_clientesxadmin,
   update_aprobacion_cliente
};
