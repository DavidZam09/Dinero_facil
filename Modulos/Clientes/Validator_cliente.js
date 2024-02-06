const { body, check } = require('express-validator');
///const Rol = require('./Model_rol');
//const Tipo_doc = require('./Model_clientes_tipo');
const User = require('./Model_cliente');



/*
const lista_usersxrol = [
   check('id', 'Invalido Rol').isInt().exists().custom(data => {
         return new Promise((resolve, reject) => {
         Rol.findOne({ where: { id: data } })
            .then(Exist => {
               if (Exist === null) {
                  reject(new Error('Rol no existe.'))
               } else {
                  resolve(true)
               }
            })
        })
     })
];

const lista_users = [
   check('id').optional({ nullable: true, checkFalsy: true }).trim().isInt().withMessage('Solo valores enteros')
];

const login_user = [
   body('password').exists().withMessage('La variable Password no existe'),
   body('email').isEmail().withMessage('Solo se admiten correos'),
   body('email', 'Invalid Email').exists().custom(data => {
      return new Promise((resolve, reject) => {
         User.findOne({ where: { email: data, activo: 1 } })
            .then(Exist => {
               if (Exist === null) {
                  reject(new Error('Email no existe.'))
               } else {
                  resolve(true)
               }
            })
      })
   })
];

const input_user = [
   body('id').optional({ nullable: true, checkFalsy: true }).trim().isInt().withMessage('Solo valores enteros'),
   body('nombre_completo').notEmpty().withMessage('Solo valores de cadena'),
   body('email').isEmail().withMessage('Solo se admite Correo'),
   body('num_celular').notEmpty().withMessage('variable no existe'),
   body('num_doc').notEmpty().withMessage('variable no existe'),   
   body('password').exists().withMessage('variable password no existe'),
   body('direccion').notEmpty().withMessage('variable no existe'),
   body('activo').isBoolean().withMessage('Solo valores booleanos'),
   body('id_user_rol', 'Invalido Rol').isInt().exists().custom(data => {
         return new Promise((resolve, reject) => {
         Rol.findOne({ where: { id: data } })
            .then(Exist => {
               if (Exist === null) {
                  reject(new Error('Rol no existe.'))
               } else {
                  resolve(true)
               }
            })
        })
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
  })
]
*/

const registrar_cliente = [
   check('cod_referido').exists().withMessage('La variable Password no existe'),
   //body('password').optional({ nullable: false }).exists().withMessage('La variable Password no existe'),
   check('password').isLength({ min: 6, max: 16 }).withMessage('El campo debe tener entre 6 y 16 caracteres'),
   check('password').matches(/^(?=.*[A-Z])(?=.*\d).+$/).withMessage('El campo debe contener al menos una letra mayúscula y un número'),
   check('email').isEmail().withMessage('Solo se admiten correos'),
   check('email', 'Invalid Email').exists().custom(data => {
      return new Promise((resolve, reject) => {
         User.findOne({ where: { email: data } })
            .then(Exist => {
               if (Exist !== null) {
                  reject(new Error('Email ya existe.'))
               } else {
                  resolve(true)
               }
            })
      })
   })
];

module.exports = {
   registrar_cliente
}
