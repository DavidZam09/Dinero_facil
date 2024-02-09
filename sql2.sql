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
/*!40103 SET TIME_ZONE='+00:00' */;
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
  `id_usuario` bigint(20) DEFAULT NULL,
  `fecha_aprobacion` date DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `num_celular` bigint(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cod_referido` varchar(20) DEFAULT NULL,
  `cod_personal` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cod_personal` (`cod_personal`),
  UNIQUE KEY `num_celular` (`num_celular`),
  KEY `FK1_id_cliente_tipo` (`id_cliente_tipo`),
  CONSTRAINT `FK1_id_cliente_tipo` FOREIGN KEY (`id_cliente_tipo`) REFERENCES `cliente_tipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.clientes: ~1 rows (aproximadamente)
INSERT INTO `clientes` (`id`, `id_cliente_tipo`, `id_usuario`, `fecha_aprobacion`, `email`, `num_celular`, `password`, `cod_referido`, `cod_personal`, `createdAt`, `updatedAt`) VALUES
	(1, 1, NULL, NULL, 'test001@gmail.com', 0, '$2b$10$Mmym6f49uFclPsvapOPDlOPqzVJKNky/oJnmi9Xnezbs9Cdyn.AgC', '', '972b924adc', '2024-02-06 21:44:51', '2024-02-06 21:44:51');

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
  `id_cliente` bigint(20) NOT NULL,
  `id_dpto` bigint(20) NOT NULL,
  `id_ciudad` bigint(20) NOT NULL,
  `id_user_tipo_doc` bigint(20) NOT NULL,
  `id_cliente_actividad_eco` bigint(20) NOT NULL,
  `id_cliente_sector_eco` bigint(20) NOT NULL,
  `nombres_cliente` varchar(100) NOT NULL,
  `apellidos_cliente` varchar(100) NOT NULL,
  `fecha_nac` date NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `num_documento` varchar(20) NOT NULL,
  `otro_sector_y_actividad` varchar(100) DEFAULT NULL,
  `nombre_empresa_labora` varchar(50) NOT NULL,
  `ingreso_mesual` bigint(20) NOT NULL,
  `gasto_mensual` bigint(20) NOT NULL,
  `foto_doc_frontal` varchar(100) NOT NULL,
  `foto_doc_trasera` varchar(100) NOT NULL,
  `foto_recivo_publico` varchar(100) DEFAULT NULL,
  `foto_pago_nomina` varchar(100) DEFAULT NULL,
  `tratamiento_datos` tinyint(4) NOT NULL DEFAULT 1,
  `terminos_y_condiciones` tinyint(4) NOT NULL DEFAULT 1,
  `rf1_nombre_completo` varchar(100) NOT NULL,
  `rf1_num_celular` varchar(20) NOT NULL,
  `rf1_direccion` varchar(100) NOT NULL,
  `rf2_nombre_completo` varchar(100) NOT NULL,
  `rf2_num_celular` varchar(20) NOT NULL,
  `rf2_direccion` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.cliente_infos: ~0 rows (aproximadamente)

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_tipo_cliente` (`nombre_tipo_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.cliente_tipos: ~5 rows (aproximadamente)
INSERT INTO `cliente_tipos` (`id`, `nombre_tipo_cliente`, `createdAt`, `updatedAt`) VALUES
	(1, 'Nuevo', '2024-02-06 19:19:00', '2024-02-06 19:19:00'),
	(2, 'En Estudio', '2024-02-06 19:19:20', '2024-02-06 19:19:20'),
	(3, 'Aprobado', '2024-02-06 19:19:38', '2024-02-06 19:19:38'),
	(4, 'No Apto', '2024-02-06 19:20:05', '2024-02-06 19:20:05'),
	(5, 'Incompleto', '2024-02-06 19:20:51', '2024-02-06 19:20:24');

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
  `activo` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `num_doc` (`num_doc`),
  UNIQUE KEY `num_celular` (`num_celular`),
  KEY `FK1_id_user_tipo_doc` (`id_user_tipo_doc`),
  KEY `FK1_id_user_rol` (`id_user_rol`),
  CONSTRAINT `FK1_id_user_rol` FOREIGN KEY (`id_user_rol`) REFERENCES `user_rols` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK1_id_user_tipo_doc` FOREIGN KEY (`id_user_tipo_doc`) REFERENCES `user_tipo_docs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.users: ~2 rows (aproximadamente)
INSERT INTO `users` (`id`, `id_user_tipo_doc`, `id_user_rol`, `nombre_completo`, `password`, `email`, `num_celular`, `num_doc`, `direccion`, `activo`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 'Admin', 'Admin', 'admin@gmail.com', 1232465798, '123465789', 'callle 12#12-!2', 0, '2024-02-04 21:47:16', '2024-02-04 21:42:00'),
	(2, 1, 1, 'Admin test', '$2b$10$fR088Y26Fv.dDKH3ACABG.Z7kPDmPGXwAJ.SRPZoeDrcbmsV9Lizq', 'admin@gmail.comm', 12324657987, '1234657898', 'callle 12#12-!2', 1, '2024-02-06 15:25:03', '2024-02-06 15:25:03');

-- Volcando estructura para tabla dinero_facil.user_rols
CREATE TABLE IF NOT EXISTS `user_rols` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_rol` (`nombre_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.user_rols: ~2 rows (aproximadamente)
INSERT INTO `user_rols` (`id`, `nombre_rol`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', '2024-02-04 10:13:20', '2024-02-04 10:13:20'),
	(2, 'Colaborador', '2024-02-04 10:13:30', '2024-02-04 10:13:30');

-- Volcando estructura para tabla dinero_facil.user_tipo_docs
CREATE TABLE IF NOT EXISTS `user_tipo_docs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tipo_doc` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_tipo_doc` (`nombre_tipo_doc`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.user_tipo_docs: ~3 rows (aproximadamente)
INSERT INTO `user_tipo_docs` (`id`, `nombre_tipo_doc`, `createdAt`, `updatedAt`) VALUES
	(1, 'C.C.', '2024-02-04 20:39:27', '2024-02-04 20:39:21'),
	(2, 'N.I.T', '2024-02-04 20:41:03', '2024-02-04 20:40:19'),
	(3, 'Pasaporte', '2024-02-04 20:41:01', '2024-02-04 20:40:48');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
