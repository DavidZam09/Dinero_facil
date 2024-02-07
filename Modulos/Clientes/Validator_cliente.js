const { body, check } = require('express-validator');
const User = require('./Model_cliente');

const registrar_cliente = [
   check('cod_referido').exists().withMessage('La variable Password no existe'),
   check('password').isLength({ min: 6, max: 16 }).withMessage('El campo debe tener entre 6 y 16 caracteres'),
   check('password').matches(/^(?=.*[A-Z])(?=.*\d).+$/).withMessage('El campo debe contener al menos una letra mayúscula y un número'),
   check('num_celular', 'Invalid num_celular').exists().custom(data => {
      return new Promise((resolve, reject) => {
         User.findOne({ where: { num_celular: data } })
            .then(Exist => {
               if (Exist !== null) {
                  reject(new Error('num_celular ya existe.'))
               } else {
                  resolve(true)
               }
            })
      })
   }),
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

const login_cliente = [
   body('password').exists().withMessage('La variable Password no existe'),
   body('email').isEmail().withMessage('Solo se admiten correos'),
   body('email', 'Invalid Email').exists().custom(data => {
      return new Promise((resolve, reject) => {
         User.findOne({ where: { email: data } })
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

module.exports = {
   registrar_cliente,
   login_cliente
}
