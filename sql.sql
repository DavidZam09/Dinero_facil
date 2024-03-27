-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='-05:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para dinero_facil
CREATE DATABASE IF NOT EXISTS `dinero_facil` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `dinero_facil`;

-- Volcando estructura para tabla dinero_facil.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_cliente_tipo` bigint(20) unsigned NOT NULL,
  `id_usuario` bigint(20) unsigned DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `num_celular` bigint(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cod_referido` varchar(20) DEFAULT NULL,
  `cod_personal` varchar(20) NOT NULL,
  `fecha_aprobacion` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cod_personal` (`cod_personal`),
  UNIQUE KEY `num_celular` (`num_celular`),
  KEY `FK1_id_cliente_tipo` (`id_cliente_tipo`),
  KEY `FK1_id_usuario` (`id_usuario`),
  CONSTRAINT `FK1_id_cliente_tipo` FOREIGN KEY (`id_cliente_tipo`) REFERENCES `cliente_tipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK1_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.clientes: ~1 rows (aproximadamente)
INSERT INTO `clientes` (`id`, `id_cliente_tipo`, `id_usuario`, `email`, `num_celular`, `password`, `cod_referido`, `cod_personal`, `fecha_aprobacion`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 1, 'rubenx87@gmail.com', 3153405538, '$2b$10$Aj8aFzFx0gaTI/4PNqZY7.rRQ.T9NiYpReDhK4SDy88FYqXPDigwS', '', '0a82f1ddec', '2024-03-26', '2024-03-27 03:36:39', '2024-03-26 03:34:15');

-- Volcando estructura para tabla dinero_facil.cliente_actividad_ecos
CREATE TABLE IF NOT EXISTS `cliente_actividad_ecos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_actividad_eco` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.cliente_actividad_ecos: ~22 rows (aproximadamente)
INSERT INTO `cliente_actividad_ecos` (`id`, `nombre_actividad_eco`, `createdAt`, `updatedAt`) VALUES
	(1, 'Almacén / Logística / Transporte', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(2, 'Administración / Oficina', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(3, 'Ventas', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(4, 'Contabilidad / Finanzas', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(5, 'Producción / Operarios / Manufactura', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(6, 'CallCenter / Telemercadeo', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(7, 'Medicina / Salud', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(8, 'Atención a clientes', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(9, 'Servicios Generales, Aseo y Seguridad', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(10, 'Mantenimiento y Reparaciones Técnicas', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(11, 'Hostelería / Turismo', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(12, 'Construcción y obra', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(13, 'Recursos Humanos', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(14, 'Informática / Telecomunicaciones', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(15, 'Compras / Comercio Exterior', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(16, 'Investigación y Calidad', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(17, 'Mercadotecnia / Publicidad / Comunicación', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(18, 'Ingeniería', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(19, 'Legal / Asesoría', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(20, 'Docencia', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(21, 'Dirección / Gerencia', '2024-02-08 08:47:52', '2024-02-08 08:47:52'),
	(22, 'Otros', '2024-02-08 08:47:52', '2024-02-08 08:47:52');

-- Volcando estructura para tabla dinero_facil.cliente_infos
CREATE TABLE IF NOT EXISTS `cliente_infos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_cliente` bigint(20) unsigned NOT NULL,
  `dpto` varchar(50) NOT NULL DEFAULT '',
  `ciudad` varchar(50) NOT NULL DEFAULT '',
  `id_user_tipo_doc` bigint(20) unsigned NOT NULL,
  `id_cliente_actividad_eco` bigint(20) unsigned NOT NULL,
  `id_cliente_sector_eco` bigint(20) unsigned NOT NULL,
  `nombres_cliente` varchar(100) NOT NULL,
  `apellidos_cliente` varchar(100) NOT NULL,
  `fecha_nac` date NOT NULL,
  `fecha_aprobacion` date DEFAULT NULL,
  `direccion` varchar(100) NOT NULL,
  `num_documento` varchar(20) NOT NULL,
  `otro_sector_y_actividad` varchar(100) DEFAULT NULL,
  `nombre_empresa_labora` varchar(50) NOT NULL,
  `ingreso_mesual` bigint(20) NOT NULL,
  `gasto_mensual` bigint(20) NOT NULL,
  `foto_cliente` varchar(100) NOT NULL,
  `foto_doc_frontal` varchar(100) NOT NULL,
  `foto_doc_trasera` varchar(100) NOT NULL,
  `foto_recivo_publico` varchar(100) DEFAULT NULL,
  `foto_pago_nomina` varchar(100) DEFAULT NULL,
  `tratamiento_datos` varchar(2) NOT NULL DEFAULT 'SI',
  `terminos_y_condiciones` varchar(2) NOT NULL DEFAULT 'SI',
  `rf1_nombre_completo` varchar(100) NOT NULL,
  `rf1_num_celular` varchar(20) NOT NULL,
  `rf1_direccion` varchar(100) NOT NULL,
  `rf2_nombre_completo` varchar(100) NOT NULL,
  `rf2_num_celular` varchar(20) NOT NULL,
  `rf2_direccion` varchar(100) NOT NULL,
  `nota_admin` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK2_id_user_tipo_doc` (`id_user_tipo_doc`),
  KEY `FK1_id_cliente_actividad_eco` (`id_cliente_actividad_eco`),
  KEY `FK1_id_cliente_sector_eco` (`id_cliente_sector_eco`),
  KEY `FK1_id_cliente` (`id_cliente`),
  CONSTRAINT `FK1_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK1_id_cliente_actividad_eco` FOREIGN KEY (`id_cliente_actividad_eco`) REFERENCES `cliente_actividad_ecos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK1_id_cliente_sector_eco` FOREIGN KEY (`id_cliente_sector_eco`) REFERENCES `cliente_sector_ecos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK2_id_user_tipo_doc` FOREIGN KEY (`id_user_tipo_doc`) REFERENCES `user_tipo_docs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.cliente_infos: ~1 rows (aproximadamente)
INSERT INTO `cliente_infos` (`id`, `id_cliente`, `dpto`, `ciudad`, `id_user_tipo_doc`, `id_cliente_actividad_eco`, `id_cliente_sector_eco`, `nombres_cliente`, `apellidos_cliente`, `fecha_nac`, `fecha_aprobacion`, `direccion`, `num_documento`, `otro_sector_y_actividad`, `nombre_empresa_labora`, `ingreso_mesual`, `gasto_mensual`, `foto_cliente`, `foto_doc_frontal`, `foto_doc_trasera`, `foto_recivo_publico`, `foto_pago_nomina`, `tratamiento_datos`, `terminos_y_condiciones`, `rf1_nombre_completo`, `rf1_num_celular`, `rf1_direccion`, `rf2_nombre_completo`, `rf2_num_celular`, `rf2_direccion`, `nota_admin`, `createdAt`, `updatedAt`) VALUES
	(3, 1, 'Valle del Cauca', 'Cali', 1, 1, 1, 'ruben', 'castillo', '1987-02-22', NULL, 'calle test - test', '123456789', '', 'lae-edu', 100000, 500000, '/doc/1/foto_cliente.pdf', '/doc/1/foto_doc_frontal.pdf', '/doc/1/foto_doc_trasera.pdf', '/doc/1/foto_recivo_publico.pdf', '/doc/1/foto_pago_nomina.pdf', 'SI', 'SI', 'lina', '741852963', 'calle test - test 2', 'karen', '654987321', 'calle test - test3', NULL, '2024-03-26 04:43:54', '2024-03-26 04:43:54');

-- Volcando estructura para tabla dinero_facil.cliente_sector_ecos
CREATE TABLE IF NOT EXISTS `cliente_sector_ecos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_sector_eco` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.cliente_sector_ecos: ~14 rows (aproximadamente)
INSERT INTO `cliente_sector_ecos` (`id`, `nombre_sector_eco`, `createdAt`, `updatedAt`) VALUES
	(1, 'Explotación de minas y canteras', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(2, 'Actividades de apoyo a la gestión pública', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(3, 'Telecomunicaciones', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(4, 'Actividades profesionales y técnicas', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(5, 'Manufactura', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(6, 'Financieras y de seguros (excepto bancos, cooperat', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(7, 'Artes, entretenimiento y recreación', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(8, 'Agricultura y pesca', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(9, 'Banca', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(10, 'Suministro de electricidad, gas, y A/C', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(11, 'Distribución de agua y saneamiento Salud humana y ', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(12, 'Comercio', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(13, 'Transporte y almacenamiento', '2024-02-08 08:53:31', '2024-02-08 08:53:31'),
	(14, 'Otro', '2024-02-08 08:53:31', '2024-02-08 08:53:31');

-- Volcando estructura para tabla dinero_facil.cliente_tipos
CREATE TABLE IF NOT EXISTS `cliente_tipos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tipo_cliente` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.cliente_tipos: ~4 rows (aproximadamente)
INSERT INTO `cliente_tipos` (`id`, `nombre_tipo_cliente`, `createdAt`, `updatedAt`) VALUES
	(1, 'Nuevo', '2024-02-07 00:19:00', '2024-02-07 00:19:00'),
	(2, 'Aprobado', '2024-03-10 04:52:16', '2024-02-07 00:19:38'),
	(3, 'No Apto', '2024-03-10 04:52:19', '2024-02-07 00:20:05'),
	(4, 'Incompleto', '2024-03-10 04:52:21', '2024-02-07 00:20:24');

-- Volcando estructura para tabla dinero_facil.configs
CREATE TABLE IF NOT EXISTS `configs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nom_variable` varchar(255) NOT NULL,
  `valor_variable` text NOT NULL,
  `detalle` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.configs: ~6 rows (aproximadamente)
INSERT INTO `configs` (`id`, `nom_variable`, `valor_variable`, `detalle`, `createdAt`, `updatedAt`) VALUES
	(1, 'correo_host', 'smtp.gmail.com', 'es le host de envio de correos', '2024-02-28 07:45:18', '2024-02-28 07:40:56'),
	(2, 'correo_port', '465', 'el puerto que usa el envio de correo', '2024-03-05 05:02:09', '2024-02-28 07:41:33'),
	(3, 'correo_secure', 'true', 'si posee seguridad ssl', '2024-02-28 07:46:35', '2024-02-28 07:42:03'),
	(4, 'correo_auth_user', 'rubenx87@gmail.com', 'usuario del correo ', '2024-02-28 07:47:08', '2024-02-28 07:42:31'),
	(5, 'correo_auth_pass', 'geob hemk czoj ypcd', 'pass del correo', '2024-02-28 08:15:37', '2024-02-28 07:42:41'),
	(6, 'nombre_empresa', 'Credito Facil', 'nombre empresa usado en la app', '2024-03-08 06:15:33', '2024-03-08 06:15:01');

-- Volcando estructura para tabla dinero_facil.config_mensajes
CREATE TABLE IF NOT EXISTS `config_mensajes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nom_mensaje` varchar(255) NOT NULL,
  `asunto_mensaje` varchar(255) DEFAULT NULL,
  `mensaje` text NOT NULL,
  `detalle` text DEFAULT NULL,
  `tipo_mensaje` enum('Correo','Whatsapp') DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.config_mensajes: ~11 rows (aproximadamente)
INSERT INTO `config_mensajes` (`id`, `nom_mensaje`, `asunto_mensaje`, `mensaje`, `detalle`, `tipo_mensaje`, `createdAt`, `updatedAt`) VALUES
	(1, 'crear_update_cliente_info', 'Datos Personales', 'Estimado Cliente su información Personal ha sido subida al sistema, Pronto uno de nuestros asesores revisarán la información suministrada, para poder continuar con el Proceso de solicitud del crédito.', 'informa al cliente sobre la creacion o actualizacion de cliente info ', 'Correo', '2024-03-10 00:00:11', '2024-03-08 05:47:25'),
	(2, 'registro_cliente', 'Bienvenido', 'Estimado cliente se ha registrado satisfactoriamente a la plataforma ||1, \r\npor favor ingrese su usuario y contraseña para continuar con el proceso de solicitud del crédito.   ', 'informa al cliente sobre el registro exitoso', 'Correo', '2024-03-10 00:33:40', '2024-03-08 06:09:27'),
	(3, 'aviso_crear_update_cliente_info', 'Aviso ||1 Cliente', 'Se ha ||1 un nuevo cliente  para revisar su informacion personal\r\nNombre cliente: ||2\r\nCorreo cliente: ||3\r\nNumero telefono cliente: ||4', 'avisoa al admin sobre la creacion de un nuevo cliente para revisa la infor,acion de cliente info', 'Correo', '2024-03-10 00:10:09', '2024-03-09 14:46:32'),
	(4, 'input_credito_cliente', ' Credito', 'Estimado cliente, has realizado una ||1 de un Crédito, por valor de: ||2,  \r\npróximamente uno de nuestros asesores revisará esta solicitud para posteriormente \r\nrealizar el desembolso del dinero solicitado.', 'informa al cliente sobre lao solictud o actualizacion  de un credito', 'Correo', '2024-03-10 00:28:46', '2024-03-09 23:59:09'),
	(5, 'aviso_input_credito_cliente', 'Aviso ||1 Credito', 'Un cliente ha solicitado un crédito: \r\nValor de crédito: ||1\r\nNombre cliente: ||2\r\nCorreo cliente: ||3\r\nNumero telefono cliente: ||4', 'informa al admin de una nueva solicitud de credito', 'Correo', '2024-03-10 00:10:02', '2024-03-10 00:04:54'),
	(6, 'pago_credito_cliente', 'Pago Credito', 'Estimado Cliente se acaba de realizar el pago de la cuota número ||1 crédito.', 'se avisa al cliente sobre el pago de las cuotas', 'Correo', '2024-03-10 01:26:16', '2024-03-10 01:19:52'),
	(7, 'aviso_pago_credito_cliente', 'Revision Pago Credito', 'Un cliente ha realizado el pago de un crédito:\r\nPago numero: ||1\r\nNombre cliente: ||2\r\nCorreo cliente: ||3\r\nNumero telefono cliente: ||4', 'se avisa al adminnistrador sobre el pago de un credito', 'Correo', '2024-03-10 16:04:12', '2024-03-10 01:32:07'),
	(8, 'revision_cliente_info', 'Revison de datos Personsales', 'Estimado usuario, nuestros asesores han revisado sus datos personales,\r\ncambiando el estado de tu cuenta a ||1', 'se da aviso al cliente sobre el resultado de la revision de sus datos  personales', NULL, '2024-03-11 00:12:41', '2024-03-11 00:04:22'),
	(9, 'aviso_aprobacion_credito', 'Estado del Credito', 'Estimado Cliente, se informa que el Credito solictado ha cambia \r\nha Estado ||1 ', 'notificacion al cliente sobre aprobacion del credito', NULL, '2024-03-13 03:39:16', '2024-03-13 03:38:38'),
	(10, 'aviso_pago_cuota_aprobacion', 'Cambio de Estado Cuota Pagada', 'Estimado Cliente, se informa que la Cuota Número ||1 de su Crédito\r\na cambia de Estado ha: ||2', 'se notifica al cliente sobre la aprobacion de la cuota pagada', NULL, '2024-03-14 02:14:15', '2024-03-14 02:09:27'),
	(11, 'aviso_paz&salvo', 'Paz & Salvo Credito', 'Estimado Cliente, te informamos que ya estas a Paz & salvo \r\ndel Crédito solicitado anteriormente, cuando Desees puedes \r\nsolicitar un nuevo credito.', 'se notifica al cliente que ya esta a apaz y salvo ', NULL, '2024-03-14 02:52:54', '2024-03-14 02:47:35');

-- Volcando estructura para tabla dinero_facil.creditos
CREATE TABLE IF NOT EXISTS `creditos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_credito_estado` bigint(20) unsigned NOT NULL DEFAULT 1,
  `id_banco` bigint(20) unsigned DEFAULT NULL,
  `id_cliente` bigint(20) unsigned NOT NULL,
  `nota_cliente` text DEFAULT NULL,
  `tipo_cobro` varchar(20) NOT NULL,
  `num_cuenta` varchar(20) DEFAULT NULL,
  `tipo_cuenta` varchar(20) DEFAULT NULL,
  `num_cuotas` bigint(20) unsigned NOT NULL,
  `valor_credito` bigint(20) unsigned NOT NULL,
  `valor_interes` bigint(20) unsigned NOT NULL,
  `valor_interes_mora` bigint(20) unsigned NOT NULL,
  `frecuencia_cobro` varchar(20) NOT NULL,
  `fec_desembolso` date DEFAULT NULL,
  `fec_pazysalvo` date DEFAULT NULL,
  `nota_admin` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK1_id_banco` (`id_banco`),
  KEY `FK1_id_credito_estado` (`id_credito_estado`),
  KEY `FK2_id_cliente` (`id_cliente`),
  CONSTRAINT `FK1_id_banco` FOREIGN KEY (`id_banco`) REFERENCES `credito_bancos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK1_id_credito_estado` FOREIGN KEY (`id_credito_estado`) REFERENCES `credito_estados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK2_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.creditos: ~2 rows (aproximadamente)
INSERT INTO `creditos` (`id`, `id_credito_estado`, `id_banco`, `id_cliente`, `nota_cliente`, `tipo_cobro`, `num_cuenta`, `tipo_cuenta`, `num_cuotas`, `valor_credito`, `valor_interes`, `valor_interes_mora`, `frecuencia_cobro`, `fec_desembolso`, `fec_pazysalvo`, `nota_admin`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 1, '', 'Transferencia', '1654762196845', 'Ahorros', 2, 100000, 15000, 8000, 'Semanal', NULL, NULL, NULL, '2024-03-27 03:35:42', '2024-03-27 03:35:42'),
	(3, 1, 1, 1, '', 'Transferencia', '1654762196845', 'Ahorros', 2, 100000, 15000, 8000, 'Semanal', NULL, NULL, NULL, '2024-03-21 03:35:42', '2024-03-27 03:35:42');

-- Volcando estructura para tabla dinero_facil.credito_bancos
CREATE TABLE IF NOT EXISTS `credito_bancos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_credito_bancos` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.credito_bancos: ~40 rows (aproximadamente)
INSERT INTO `credito_bancos` (`id`, `nombre_credito_bancos`, `createdAt`, `updatedAt`) VALUES
	(1, 'BANCOLOMBIA', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(2, 'BANCO AGRARIO', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(3, 'BANCO AV VILLAS', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(4, 'BANCO CAJA SOCIAL', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(5, 'BANCO COOPERATIVO COOPCENTRAL', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(6, 'BANCO CREDIFINANCIERA SA.', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(7, 'BANCO DAVIVIENDA', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(8, 'BANCO DE BOGOTÁ', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(9, 'BANCO DE LAS MICROFINANZAS BANCAMIA S.A.', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(10, 'BANCO DE OCCIDENTE', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(11, 'BANCO FALABELLA S.A.', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(12, 'BANCO FINANDINA S.A.', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(13, 'BANCO GNB COLOMBIA S.A', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(14, 'BANCO GNB SUDAMERIS', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(15, 'BANCO MUNDO MUJER', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(16, 'BANCO PICHINCHA', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(17, 'BANCO POPULAR', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(18, 'BANCO PROCREDIT', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(19, 'BANCO SANTANDER DE NEGOCIOS', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(20, 'BANCO SERFINANZA', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(21, 'BANCO W S.A', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(22, 'BANCOOMEVA', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(23, 'BANCÓLDEX S.A.', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(24, 'BBVA', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(25, 'BNP PARIBAS', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(26, 'CITIBANK', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(27, 'COLTEFINANCIERA S.A.', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(28, 'CONFIAR', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(29, 'COOFINEP COOPERATIVA FINANCIERA', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(30, 'COOPERATIVA FINANCIERA DE ANTIOQUIA', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(31, 'COTRAFA COOPERATIVA FINANCIERA', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(32, 'Daviplata', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(33, 'FINANCIERA JURISCOOP S.A. COMPAÑÍA DE FINANCIAMIENTO', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(34, 'GIROS Y FINANZAS COMPAÑÍA DE FINANCIAMIENTO S.A.', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(35, 'ITAÚ', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(36, 'ITAÚ antes CorpBanca', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(37, 'MIBANCO S.A.', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(38, 'NEQUI', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(39, 'Rappipay', '2024-03-05 02:32:37', '2024-03-05 02:32:37'),
	(40, 'Scotiabank Colpatria S.A', '2024-03-05 02:32:37', '2024-03-05 02:32:37');

-- Volcando estructura para tabla dinero_facil.credito_cotizacions
CREATE TABLE IF NOT EXISTS `credito_cotizacions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `valor_prestamo` bigint(20) NOT NULL,
  `frecuencia_cobro` varchar(20) NOT NULL,
  `interes` bigint(20) NOT NULL,
  `interes_mora` bigint(20) NOT NULL,
  `activo` varchar(2) NOT NULL DEFAULT 'SI',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.credito_cotizacions: ~20 rows (aproximadamente)
INSERT INTO `credito_cotizacions` (`id`, `valor_prestamo`, `frecuencia_cobro`, `interes`, `interes_mora`, `activo`, `createdAt`, `updatedAt`) VALUES
	(1, 100000, 'Semanal', 15000, 8000, 'SI', '2024-03-06 00:09:43', '2024-03-06 00:09:43'),
	(2, 200000, 'Semanal', 30000, 16000, 'SI', '2024-03-06 00:09:43', '2024-03-06 00:09:43'),
	(3, 300000, 'Semanal', 45000, 24000, 'SI', '2024-03-06 00:09:43', '2024-03-06 00:09:43'),
	(4, 400000, 'Semanal', 60000, 32000, 'SI', '2024-03-06 00:09:43', '2024-03-06 00:09:43'),
	(5, 500000, 'Semanal', 75000, 40000, 'SI', '2024-03-06 03:52:26', '2024-03-06 00:09:43'),
	(6, 600000, 'Semanal', 90000, 48000, 'SI', '2024-03-06 00:09:43', '2024-03-06 00:09:43'),
	(7, 700000, 'Semanal', 105000, 56000, 'SI', '2024-03-06 00:09:43', '2024-03-06 00:09:43'),
	(8, 800000, 'Semanal', 120000, 64000, 'SI', '2024-03-06 00:09:43', '2024-03-06 00:09:43'),
	(9, 900000, 'Semanal', 135000, 72000, 'SI', '2024-03-06 00:09:43', '2024-03-06 00:09:43'),
	(10, 1000000, 'Semanal', 150000, 80000, 'SI', '2024-03-06 00:09:43', '2024-03-06 00:09:43'),
	(11, 100000, 'Quincenal', 23000, 13000, 'SI', '2024-03-06 00:15:08', '2024-03-06 00:15:08'),
	(12, 200000, 'Quincenal', 57000, 28000, 'SI', '2024-03-06 00:15:08', '2024-03-06 00:15:08'),
	(13, 300000, 'Quincenal', 87000, 39000, 'SI', '2024-03-06 00:15:08', '2024-03-06 00:15:08'),
	(14, 400000, 'Quincenal', 117000, 52000, 'SI', '2024-03-06 00:15:08', '2024-03-06 00:15:08'),
	(15, 500000, 'Quincenal', 147000, 65000, 'SI', '2024-03-06 00:15:08', '2024-03-06 00:15:08'),
	(16, 600000, 'Quincenal', 170000, 78000, 'SI', '2024-03-06 00:15:08', '2024-03-06 00:15:08'),
	(17, 700000, 'Quincenal', 192000, 91000, 'SI', '2024-03-06 00:15:08', '2024-03-06 00:15:08'),
	(18, 800000, 'Quincenal', 223000, 104000, 'SI', '2024-03-06 00:15:08', '2024-03-06 00:15:08'),
	(19, 900000, 'Quincenal', 240000, 117000, 'SI', '2024-03-06 00:15:08', '2024-03-06 00:15:08'),
	(20, 1000000, 'Quincenal', 270000, 130000, 'SI', '2024-03-06 00:15:08', '2024-03-06 00:15:08');

-- Volcando estructura para tabla dinero_facil.credito_estados
CREATE TABLE IF NOT EXISTS `credito_estados` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_credito_tipo` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.credito_estados: ~5 rows (aproximadamente)
INSERT INTO `credito_estados` (`id`, `nombre_credito_tipo`, `createdAt`, `updatedAt`) VALUES
	(1, 'Solicitado', '2024-03-05 02:34:47', '2024-03-05 02:34:31'),
	(2, 'Desembolsado', '2024-03-05 02:36:01', '2024-03-05 02:34:42'),
	(3, 'Cancelado', '2024-03-05 02:34:58', '2024-03-05 02:34:58'),
	(4, 'Paz&Salvo', '2024-03-05 02:35:40', '2024-03-05 02:35:40'),
	(5, 'Incompleto', '2024-03-05 02:41:03', '2024-03-05 02:41:03');

-- Volcando estructura para tabla dinero_facil.credito_pago_cuotas
CREATE TABLE IF NOT EXISTS `credito_pago_cuotas` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_credito` bigint(20) unsigned NOT NULL,
  `id_credito_pago_estado` bigint(20) unsigned NOT NULL,
  `id_user_cobra` bigint(20) unsigned DEFAULT NULL,
  `num_pago` bigint(20) unsigned NOT NULL,
  `fecha_estimada_pago` date NOT NULL,
  `fecha_pago` date DEFAULT NULL,
  `valor_pagado` bigint(20) DEFAULT NULL,
  `soporte_pago` varchar(100) DEFAULT NULL,
  `nota_admin` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK1_id_credito` (`id_credito`),
  KEY `FK1_id_credito_pago_estado` (`id_credito_pago_estado`),
  KEY `FK1_id_user_cobra` (`id_user_cobra`),
  CONSTRAINT `FK1_id_credito` FOREIGN KEY (`id_credito`) REFERENCES `creditos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK1_id_credito_pago_estado` FOREIGN KEY (`id_credito_pago_estado`) REFERENCES `credito_pago_estados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK1_id_user_cobra` FOREIGN KEY (`id_user_cobra`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.credito_pago_cuotas: ~2 rows (aproximadamente)
INSERT INTO `credito_pago_cuotas` (`id`, `id_credito`, `id_credito_pago_estado`, `id_user_cobra`, `num_pago`, `fecha_estimada_pago`, `fecha_pago`, `valor_pagado`, `soporte_pago`, `nota_admin`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 2, 1, 2, '2024-04-02', '2024-03-27', NULL, '/doc/1/creditos/1/2.png', NULL, '2024-03-27 05:22:04', '2024-03-27 05:22:03'),
	(2, 1, 1, 1, 1, '2024-03-26', NULL, NULL, NULL, NULL, '2024-03-27 04:23:08', '2024-03-27 04:22:52');

-- Volcando estructura para tabla dinero_facil.credito_pago_estados
CREATE TABLE IF NOT EXISTS `credito_pago_estados` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_estado_pago` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.credito_pago_estados: ~4 rows (aproximadamente)
INSERT INTO `credito_pago_estados` (`id`, `nombre_estado_pago`, `createdAt`, `updatedAt`) VALUES
	(1, 'Programado', '2024-03-07 02:36:52', '2024-03-07 02:36:52'),
	(2, 'En Revision', '2024-03-07 02:36:45', '2024-03-07 02:34:42'),
	(3, 'Aprobado', '2024-03-07 02:36:41', '2024-03-07 02:35:10'),
	(4, 'Cancelado', '2024-03-07 02:36:33', '2024-03-07 02:35:53');

-- Volcando estructura para tabla dinero_facil.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_user_tipo_doc` bigint(20) unsigned NOT NULL,
  `id_user_rol` bigint(20) unsigned NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `num_celular` bigint(20) NOT NULL,
  `num_doc` varchar(20) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `activo` varchar(2) NOT NULL DEFAULT 'SI',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK1_id_user_tipo_doc` (`id_user_tipo_doc`),
  KEY `FK1_id_user_rol` (`id_user_rol`),
  CONSTRAINT `FK1_id_user_rol` FOREIGN KEY (`id_user_rol`) REFERENCES `user_rols` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK1_id_user_tipo_doc` FOREIGN KEY (`id_user_tipo_doc`) REFERENCES `user_tipo_docs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.users: ~0 rows (aproximadamente)
INSERT INTO `users` (`id`, `id_user_tipo_doc`, `id_user_rol`, `nombre_completo`, `password`, `email`, `num_celular`, `num_doc`, `direccion`, `activo`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 'Admin', '$2b$10$H.K6gnPj7Ru/t.07bOYsk.KrNZomBM5bp3XYsGLaVbwrtZqh1Xx.K', 'rubenx87@gmail.com', 123456789, '12121212', 'callle 12 # 12 -123', 'SI', '2024-03-10 02:56:05', '2024-03-10 02:54:01');

-- Volcando estructura para tabla dinero_facil.user_rols
CREATE TABLE IF NOT EXISTS `user_rols` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.user_rols: ~2 rows (aproximadamente)
INSERT INTO `user_rols` (`id`, `nombre_rol`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', '2024-02-04 15:13:20', '2024-02-04 15:13:20'),
	(2, 'Colaborador', '2024-02-04 15:13:30', '2024-02-04 15:13:30');

-- Volcando estructura para tabla dinero_facil.user_tipo_docs
CREATE TABLE IF NOT EXISTS `user_tipo_docs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tipo_doc` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.user_tipo_docs: ~3 rows (aproximadamente)
INSERT INTO `user_tipo_docs` (`id`, `nombre_tipo_doc`, `createdAt`, `updatedAt`) VALUES
	(1, 'C.C.', '2024-02-05 01:39:27', '2024-02-05 01:39:21'),
	(2, 'N.I.T', '2024-02-05 01:41:03', '2024-02-05 01:40:19'),
	(3, 'Pasaporte', '2024-02-05 01:41:01', '2024-02-05 01:40:48');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
