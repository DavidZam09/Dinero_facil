const { body, check } = require('express-validator');
const Rol = require('./Model_rol');
const Tipo_doc = require('./Model_tipo_doc');
const User = require('./Model_usuario');

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
         User.findOne({ where: { email: data, activo: "SI" } })
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
   body('nombre_completo').notEmpty().withMessage('variable no existe o es nula'),
   body('email').isEmail().withMessage('Solo se admite Correo'),
   body('num_celular').notEmpty().withMessage('variable no existe o es nula'),
   body('num_doc').notEmpty().withMessage('variable no existe o es nula'),   
   body('password').exists().withMessage('variable password no existe'),
   body('direccion').notEmpty().withMessage('variable no existe o es nula'),
   body('activo').isIn(["SI","NO"]).withMessage('Solo es permitido los valores SI y NO'),
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

module.exports = {
   lista_usersxrol,
   lista_users,
   login_user,
   input_user
}
