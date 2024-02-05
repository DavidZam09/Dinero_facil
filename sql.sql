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

-- Volcando estructura para tabla dinero_facil.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_user_tipo_doc` bigint(20) unsigned NOT NULL,
  `id_user_rol` bigint(20) unsigned NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `num_celular` varchar(20) NOT NULL,
  `num_doc` bigint(20) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK1_id_user_tipo_doc` (`id_user_tipo_doc`),
  KEY `FK1_id_user_rol` (`id_user_rol`),
  CONSTRAINT `FK1_id_user_rol` FOREIGN KEY (`id_user_rol`) REFERENCES `user_rols` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK1_id_user_tipo_doc` FOREIGN KEY (`id_user_tipo_doc`) REFERENCES `user_tipo_docs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.users: ~1 rows (aproximadamente)
INSERT IGNORE INTO `users` (`id`, `id_user_tipo_doc`, `id_user_rol`, `nombre_completo`, `password`, `email`, `num_celular`, `num_doc`, `direccion`, `activo`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 'Admin', 'Admin', 'admin@gmail.com', '1232465798', 123465789, 'callle 12#12-!2', 0, '2024-02-04 16:47:16', '2024-02-04 16:42:00');

-- Volcando estructura para tabla dinero_facil.user_rols
CREATE TABLE IF NOT EXISTS `user_rols` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.user_rols: ~2 rows (aproximadamente)
INSERT IGNORE INTO `user_rols` (`id`, `nombre_rol`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', '2024-02-04 05:13:20', '2024-02-04 05:13:20'),
	(2, 'Colaborador', '2024-02-04 05:13:30', '2024-02-04 05:13:30');

-- Volcando estructura para tabla dinero_facil.user_tipo_docs
CREATE TABLE IF NOT EXISTS `user_tipo_docs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tipo_doc` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dinero_facil.user_tipo_docs: ~3 rows (aproximadamente)
INSERT IGNORE INTO `user_tipo_docs` (`id`, `nombre_tipo_doc`, `createdAt`, `updatedAt`) VALUES
	(1, 'C.C.', '2024-02-04 15:39:27', '2024-02-04 15:39:21'),
	(2, 'N.I.T', '2024-02-04 15:41:03', '2024-02-04 15:40:19'),
	(3, 'Pasaporte', '2024-02-04 15:41:01', '2024-02-04 15:40:48');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
