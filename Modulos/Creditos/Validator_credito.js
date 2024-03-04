const { body, check } = require("express-validator");

const Bancos = require("./Model_credito_bancos");
const Credito_estados = require("./Model_credito_estados");
const Creditos = require("./Model_creditos");
const Usuarios = require("../Usuarios/Model_usuario");
const Cliente = require("../Clientes/Model_cliente");

const input_credito = [
   body('id', "Invalido Credito")
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            if ((data === '') || (data === null)) {
               resolve(true);
            } else {
               Creditos.findOne({ where: { id: data } }).then((Exist) => {
                  if (Exist === null) {
                     reject(new Error("Credito no existe."));
                  } else {
                     resolve(true);
                  }
               });
            }
         });
      }),
   body("id_credito_estado", "Invalido Estado Credito")
      .isInt()
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            Credito_estados.findOne({ where: { id: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Estado Credito no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
   body("id_banco", "Invalido Banco")
      .isInt()
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            Bancos.findOne({ where: { id: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Banco no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
   body("id_usuario_aprueba", "Invalido Usuario")
      .isInt()
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => {
            Usuarios.findOne({ where: { id: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Usuario no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
   body("id_cliente", "Invalido Cliente")
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
   body("valor_credito").isInt().withMessage("Solo se admiten numero enteros"),
   body('entrega_en_efectivo').isIn(["SI","NO"]).withMessage('Solo es permitido los valores "SI" y "NO"'),
   body('tipo_cobro').isIn(["Efectivo","Transferencia"]).withMessage('Solo es permitido los valores "Efectivo" y "Transferencia"'),
   body("tipo_cuenta", "Invalido Tipo de Cuenta")
      .exists()
      .custom(async (data, { req }) => {
         return new Promise((resolve, reject) => { 
            if (req.body.tipo_cobro === 'Transferencia') {
               if(data==="Ahorros"){
                  resolve(true)
               }if(data==="Corriente") {
                  resolve(true)
               } else {
                  reject(new Error('Solo es permitido los valores "Ahorros" y "Corriente"'))
               }
            }else{
               req.body.tipo_cuenta = '';
               /*if(data){
                  reject(new Error('Este campo debe estar vacio'))
               }else{
                  resolve(true)
               }*/
            }
         });
      }),
   body("num_cuenta", "Invalido Tipo de Cuenta")
      .exists()
      .custom(async (data, { req }) => {
         return new Promise((resolve, reject) => { 
            if (req.body.tipo_cobro === 'Transferencia') {
               if(!data){
                  reject(new Error('Numero de cuenta esta vacio'))
               }else{
                  resolve(true)
               }
            }else{
               req.body.num_cuenta = '';
               resolve(true)
            }
         });
      }),
   body('periodicidad_cobro').isIn(["Semanal","Quincenal"]).withMessage('Solo es permitido los valores "Semanal" y "Quincenal"'),
   body("num_cuotas").isInt().withMessage("Solo se admiten numero enteros"),
   body('fec_desembolso').optional({ nullable: true }).isDate({ format: 'YYYY-MM-DD' }).withMessage('Solo se permite fecha con el formato YYY-MM-DD'),
   body('fec_pazysalvo').optional({ nullable: true }).isDate({ format: 'YYYY-MM-DD' }).withMessage('Solo se permite fecha con el formato YYY-MM-DD'),

];


module.exports = {
   input_credito
};
