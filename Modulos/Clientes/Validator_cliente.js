const { body, check } = require("express-validator");
const Sequelize = require("sequelize");

const Cliente_info = require("./Model_clientes_info");
const Cliente_act_eco = require("./Model_clientes_actividad_eco");
const Cliente_sec_eco = require("./Model_clientes_sector_eco");
const Cliente = require('./Model_cliente');
const Tipo_Cliente = require('./Model_clientes_tipo');

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
            Cliente.findOne({ where: { id: data } }).then(async (Exist) => {
               if (Exist === null) {
                  reject(new Error("Cliente no existe."));
               } else {
                  const cliente_info = await Cliente_info.findOne({ where: { id_cliente: data } });
                  if( cliente_info === null ){
                     reject(new Error("Cliente_info no existe."));
                  }else{
                     resolve(true);
                  }
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
                     reject(new Error("Cliente_info no existe."));
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
            const cliente = await Cliente.findOne({ where: { id: data } });
            if( cliente === null ){
               reject(new Error("El Cliente no existe"));
            }

            if ((req.body.id === '') || (req.body.id === null)) {
               const cliente_info = await Cliente_info.findOne({ where:{ id_cliente: data } })
               if ((cliente_info === '') || (cliente_info === null)) {
                  resolve(true);
               } else {
                  reject(new Error("Cliente_info ya existe."));
               }
            } else {
               const cliente_info = await Cliente_info.findOne({ where: { id_cliente: data, id: req.body.id } })
               if (cliente_info === null) {
                  reject(new Error("Cliente_info no existe o es erroneo."));
               } else {
                  if ( (cliente.id_cliente_tipo === 1) || (cliente.id_cliente_tipo === 4)) {
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
   body("dpto").notEmpty().withMessage('variable no existe o es nula'),
   body("ciudad").notEmpty().withMessage('variable no existe o es nula'),
   body('nombres_cliente').notEmpty().withMessage('variable no existe o es nula'),
   body('apellidos_cliente').notEmpty().withMessage('variable no existe o es nula'),
   body('fecha_nac').notEmpty().isISO8601('yyyy-mm-dd').toDate().withMessage('Solo se permite fecha con el formato YYY-MM-DD'),
   body('direccion').notEmpty().withMessage('variable no existe o es nula'),
   body('num_documento').isLength({ min: 6, max: 20 }).withMessage("El campo debe tener entre 6 y 20 caracteres"),
   body('otro_sector_y_actividad').exists().withMessage('variable no existe'),
   body('nombre_empresa_labora').notEmpty().withMessage('variable no existe o es nula'),
   body("ingreso_mesual").isInt().withMessage("Solo se admiten numero enteros"),
   body("gasto_mensual").isInt().withMessage("Solo se admiten numero enteros"),
   body('tratamiento_datos').isIn(["SI","NO"]).withMessage('Solo es permitido los valores SI y NO'),
   body('terminos_y_condiciones').isIn(["SI","NO"]).withMessage('Solo es permitido los valores SI y NO'),
   body("rf1_nombre_completo").notEmpty().withMessage('variable no existe o es nula'),
   body("rf1_num_celular").notEmpty().withMessage('variable no existe o es nula'),
   body("rf1_direccion").notEmpty().withMessage('variable no existe o es nula'),
   body("rf2_nombre_completo").notEmpty().withMessage('variable no existe o es nula'),
   body("rf2_num_celular").notEmpty().withMessage('variable no existe o es nula'),
   body("rf2_direccion").notEmpty().withMessage('variable no existe o es nula')
];

/////////////////////////////////////////////////////////////////// validaciones para los admin //////////////////////////////////////////////////////////////////

const lista_clientesxadmin = [
   check("id_estado_cliente", "Invalido Usuario")
      .isInt()
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            Tipo_Cliente.findOne({ where: { id: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Cliente Tipo no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
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
      body("id", "Invalido Usuario")
         .isInt()
         .exists()
         .custom((data) => {
            return new Promise((resolve, reject) => {
               Cliente_info.findOne({ where: { id: data } }).then((Exist) => {
                  if (Exist === null) {
                     reject(new Error("Cliente info no existe."));
                  } else {
                     Cliente.findOne({ where: { id: Exist.id_cliente } }).then(async (data) => {
                        if (data === null) {
                           reject(new Error("Cliente no existe."));
                        }if ( parseInt(data.id_cliente_tipo) ===  1 ) {
                           resolve(true);
                        }if ( parseInt(data.id_cliente_tipo) ===  2 ) {
                           //reject(new Error("No se puede modificar el estado de un cliente Aprobado"));
                           resolve(true);
                        }if ( parseInt(data.id_cliente_tipo) ===  3 ) {
                           //reject(new Error("No se puede modificar el estado de un cliente No Apto"));
                           resolve(true);
                        }if ( parseInt(data.id_cliente_tipo) ===  4 ) {
                           resolve(true);
                        }
                     });
                  }
               });
            });
         }),
      body("nota_admin").notEmpty().withMessage('variable es nula'),
      body('id_cliente_tipo').isIn([ 2, 3, 4 ]).withMessage('Solo es permitido cambiar a los estado Aprobado, Incompleto, No apto'),
   ];

module.exports = {
   registrar_cliente,
   login_cliente,
   lista_cliente_infoxcliente,
   input_cliente_info,
   lista_clientesxadmin,
   update_aprobacion_cliente
};
