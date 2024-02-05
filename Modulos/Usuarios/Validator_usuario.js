const { body } = require('express-validator');

module.exports = {
    val_lista_roles
}

const val_lista_roles = [
    body('id', 'Invalido User').isInt().exists().custom(data => {
        return new Promise((resolve, reject) => {
           User.findOne({ where: { id: data } })
              .then(Exist => {
                 if (Exist === null) {
                    reject(new Error('Usuario no existe.'))
                 } else {
                    resolve(true)
                 }
              })

        })
     })
];