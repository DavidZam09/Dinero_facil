const { body, check } = require("express-validator");

const Bancos = require("./Model_credito_bancos");
const Credito_estados = require("./Model_credito_estados");
const Credito_cotizacion = require("./Model_credito_cotizacion");
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
      .exists().optional({ nullable: true })
      .custom((data, { req }) => {
         return new Promise((resolve, reject) => {
            if ((req.body.id === '') || (req.body.id === null)){
               resolve(true);
            }else{
               Credito_estados.findOne({ where: { id: data } }).then((Exist) => {
                  if (Exist === null) {
                     reject(new Error("Estado Credito no existe."));
                  } else {
                     resolve(true);
                  }
               });
            }
         });
      }),
   body("id_banco", "Invalido Banco")
      .isInt()
      .exists()
      .custom((data, { req }) => {
         return new Promise((resolve, reject) => {
            if ((req.body.id === '') || (req.body.id === null)){
               resolve(true);
            }else{
               Bancos.findOne({ where: { id: data } }).then((Exist) => {
                  if (Exist === null) {
                     reject(new Error("Banco no existe."));
                  } else {
                     resolve(true);
                  }
               });
            }
         });
      }),
   body("id_usuario_aprueba", "Invalido Usuario")
      .exists().optional({ nullable: true })
      .custom( (data, { req }) => {
         return new Promise((resolve, reject) => {
            if ((req.body.id === '') || (req.body.id === null)){
               resolve(true);
            }else{
               Usuarios.findOne({ where: { id: data } }).then((Exist) => {
                  if (Exist === null) {
                     reject(new Error("Usuario no existe."));
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
      .custom((data) => {
         return new Promise(async (resolve, reject) => {
            await Cliente.findOne({ where: { id: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Cliente no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
   body("valor_credito").isInt().withMessage("Solo se admiten numero enteros"),
   body('entrega_en_efectivo').isIn(["SI","NO"]).withMessage('Solo es permitido los valores SI y NO'),
   body('tipo_cobro').isIn(["Efectivo","Transferencia"]).withMessage('Solo es permitido los valores Efectivo y Transferencia'),
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
               resolve(true)
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
               resolve(true)
            }
         });
      }),
   body('periodicidad_cobro').isIn(["Semanal","Quincenal"]).withMessage('Solo es permitido los valores Semanal y Quincenal'),
   body("num_cuotas").isInt().withMessage("Solo se admiten numero enteros"),
   body("nota_cliente").exists().withMessage("No existe el campo nota_cliente"),
   body('fec_desembolso').optional({ nullable: true, checkFalsy: true  }).isISO8601('yyyy-mm-dd').toDate().withMessage('Solo se permite fecha con el formato YYY-MM-DD'),
   body('fec_pazysalvo').optional({ nullable: true, checkFalsy: true  }).isISO8601('yyyy-mm-dd').toDate().withMessage('Solo se permite fecha con el formato YYY-MM-DD'),
];

const cotizacion_credito = [
   check('id', "Invalido Credito Cotizacion")
      .exists()
      .custom((data) => {
         return new Promise((resolve, reject) => { 
            Credito_cotizacion.findOne({ where: { id: data, activo: 'SI' } }).then((Exist) => {
               if ( Exist === null ) {
                  reject(new Error("Credito Cotizacion no existe."));
               } else {
                  resolve(true);
               }
            });
         });
      }),
   check("num_cuotas").isInt({min: 1}).withMessage("Solo se admiten numero enteros mayores a 0"),
   check('fecha_desembolso').isISO8601('yyyy-mm-dd').toDate().withMessage('Solo se permite fecha con el formato YYY-MM-DD'),
];

const input_credito_cotizacion = [
   body('id', "Invalido Credito Cotizacion")
   .exists()
   .custom((data) => {
      return new Promise((resolve, reject) => {
         if ((data === '') || (data === null)) {
            resolve(true);
         } else {
            Credito_cotizacion.findOne({ where: { id: data } }).then((Exist) => {
               if (Exist === null) {
                  reject(new Error("Credito Cotizacion no existe."));
               } else {
                  resolve(true);
               }
            });
         }
      });
   }),
   body("valor_prestamo").isInt({min: 1}).withMessage("Solo se admiten numero mayores a 0"),
   body('frecuencia_cobro').isIn(["Semanal","Quincenal"]).withMessage('Solo es permitido los valores Semanal y Quincenal'),
   body("interes").isInt({min: 1}).withMessage("Solo se admiten numero mayores a 0"),
   body("interes_mora").isInt({min: 1}).withMessage("Solo se admiten numero mayores a 0"),
   body('activo').isIn(["SI","NO"]).withMessage('Solo es permitido los valores SI y NO'),
];

module.exports = {
   input_credito,
   cotizacion_credito,
   input_credito_cotizacion
};
