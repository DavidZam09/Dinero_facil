var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

const cron = require('node-cron');
const Task = require("./Helpers/Cron");

var app = express();
require("./Helpers/Config_db");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  // 👇️ specify CORS headers to send 👇️
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'POST, PUT, PATCH, GET, DELETE, OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.get('/', function(req, res, next) { res.render('index', { title: 'Express' }); });
app.use(require('./Modulos/Usuarios/Route_usuario'));
app.use(require('./Modulos/Clientes/Route_cliente'));
app.use(require('./Modulos/Creditos/Route_creditos'));

//cron.schedule('00 08 * * *', Task.test);
cron.schedule('00 08 * * *', Task.Asignar_Cobrador);
cron.schedule('00 08 * * *', Task.Recordatorio_pago_cobro);
cron.schedule('00 08 * * *', Task.Aviso_mora_pago_cuota);
var Cron = require('./Helpers/Cron');
//app.get('/cron/test',  Cron.Asignar_Cobrador);
//app.get('/cron/test',  Cron.Recordatorio_pago_cobro);
//app.get('/cron/test',  Cron.Aviso_mora_pago_cuota);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error', { message: "Error while login" });
});

module.exports = app;
