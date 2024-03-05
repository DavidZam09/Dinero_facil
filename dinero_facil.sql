-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-03-2024 a las 06:20:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-05:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dinero_facil`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_cliente_tipo` bigint(20) UNSIGNED NOT NULL,
  `id_usuario` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(100) NOT NULL,
  `num_celular` bigint(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cod_referido` varchar(20) DEFAULT NULL,
  `cod_personal` varchar(20) NOT NULL,
  `fecha_aprobacion` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `id_cliente_tipo`, `id_usuario`, `email`, `num_celular`, `password`, `cod_referido`, `cod_personal`, `fecha_aprobacion`, `createdAt`, `updatedAt`) VALUES
(1, 1, 0, 'test001@gmail.com', 0, '$2b$10$Mmym6f49uFclPsvapOPDlOPqzVJKNky/oJnmi9Xnezbs9Cdyn.AgC', '', '972b924adc', NULL, '2024-02-07 02:44:51', '2024-02-07 02:44:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_actividad_ecos`
--

CREATE TABLE `cliente_actividad_ecos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_actividad_eco` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente_actividad_ecos`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_infos`
--

CREATE TABLE `cliente_infos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_cliente` bigint(20) NOT NULL,
  `id_dpto` bigint(20) NOT NULL,
  `id_ciudad` bigint(20) NOT NULL,
  `id_user_tipo_doc` bigint(20) NOT NULL,
  `id_cliente_actividad_eco` bigint(20) NOT NULL,
  `id_cliente_sector_eco` bigint(20) NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
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
  `tratamiento_datos` tinyint(4) NOT NULL DEFAULT 1,
  `terminos_y_condiciones` tinyint(4) NOT NULL DEFAULT 1,
  `rf1_nombre_completo` varchar(100) NOT NULL,
  `rf1_num_celular` varchar(20) NOT NULL,
  `rf1_direccion` varchar(100) NOT NULL,
  `rf2_nombre_completo` varchar(100) NOT NULL,
  `rf2_num_celular` varchar(20) NOT NULL,
  `rf2_direccion` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente_infos`
--

INSERT INTO `cliente_infos` (`id`, `id_cliente`, `id_dpto`, `id_ciudad`, `id_user_tipo_doc`, `id_cliente_actividad_eco`, `id_cliente_sector_eco`, `id_usuario`, `nombres_cliente`, `apellidos_cliente`, `fecha_nac`, `fecha_aprobacion`, `direccion`, `num_documento`, `otro_sector_y_actividad`, `nombre_empresa_labora`, `ingreso_mesual`, `gasto_mensual`, `foto_cliente`, `foto_doc_frontal`, `foto_doc_trasera`, `foto_recivo_publico`, `foto_pago_nomina`, `tratamiento_datos`, `terminos_y_condiciones`, `rf1_nombre_completo`, `rf1_num_celular`, `rf1_direccion`, `rf2_nombre_completo`, `rf2_num_celular`, `rf2_direccion`, `createdAt`, `updatedAt`) VALUES
(2, 1, 1, 0, 1, 1, 1, NULL, 'ruben', 'castillo', '1987-02-22', NULL, 'calle test - test', '123456789', '', 'lae-edu', 100000, 500000, 'D:\\Developer_dev\\Proyectos\\Credito_Facil\\Dinero_facil\\uploads\\temp\\doc\\a4a94a0146\\/foto_cliente.jpg', 'D:\\Developer_dev\\Proyectos\\Credito_Facil\\Dinero_facil\\uploads\\temp\\doc\\a4a94a0146\\/foto_doc_frontal.', 'D:\\Developer_dev\\Proyectos\\Credito_Facil\\Dinero_facil\\uploads\\temp\\doc\\a4a94a0146\\/foto_doc_trasera.', 'D:\\Developer_dev\\Proyectos\\Credito_Facil\\Dinero_facil\\uploads\\temp\\doc\\a4a94a0146\\/foto_recivo_publi', 'D:\\Developer_dev\\Proyectos\\Credito_Facil\\Dinero_facil\\uploads\\temp\\doc\\a4a94a0146\\/foto_pago_nomina.', 1, 1, 'lina', '741852963', 'calle test - test 2', 'karen', '654987321', 'calle test - test3', '2024-03-05 05:01:25', '2024-03-05 05:01:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_sector_ecos`
--

CREATE TABLE `cliente_sector_ecos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_sector_eco` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente_sector_ecos`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_tipos`
--

CREATE TABLE `cliente_tipos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_tipo_cliente` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente_tipos`
--

INSERT INTO `cliente_tipos` (`id`, `nombre_tipo_cliente`, `createdAt`, `updatedAt`) VALUES
(1, 'Nuevo', '2024-02-07 00:19:00', '2024-02-07 00:19:00'),
(2, 'En Estudio', '2024-02-07 00:19:20', '2024-02-07 00:19:20'),
(3, 'Aprobado', '2024-02-07 00:19:38', '2024-02-07 00:19:38'),
(4, 'No Apto', '2024-02-07 00:20:05', '2024-02-07 00:20:05'),
(5, 'Incompleto', '2024-02-07 00:20:51', '2024-02-07 00:20:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configs`
--

CREATE TABLE `configs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_variable` varchar(255) NOT NULL,
  `valor_variable` text NOT NULL,
  `detalle` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `configs`
--

INSERT INTO `configs` (`id`, `nom_variable`, `valor_variable`, `detalle`, `createdAt`, `updatedAt`) VALUES
(1, 'correo_host', 'smtp.gmail.com', 'es le host de envio de correos', '2024-02-28 07:45:18', '2024-02-28 07:40:56'),
(2, 'correo_port', '465', 'el puerto que usa el envio de correo', '2024-03-05 05:02:09', '2024-02-28 07:41:33'),
(3, 'correo_secure', 'true', 'si posee seguridad ssl', '2024-02-28 07:46:35', '2024-02-28 07:42:03'),
(4, 'correo_auth_user', 'rubenx87@gmail.com', 'usuario del correo ', '2024-02-28 07:47:08', '2024-02-28 07:42:31'),
(5, 'correo_auth_pass', 'geob hemk czoj ypcd', 'pass del correo', '2024-02-28 08:15:37', '2024-02-28 07:42:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `config_mensajes`
--

CREATE TABLE `config_mensajes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom_mensaje` varchar(255) NOT NULL,
  `asunto_mensaje` varchar(255) DEFAULT NULL,
  `mensaje` text NOT NULL,
  `detalle` text DEFAULT NULL,
  `tipo_mensaje` enum('Correo','Whatsapp') DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `creditos`
--

CREATE TABLE `creditos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_credito_estado` bigint(20) UNSIGNED NOT NULL DEFAULT 1,
  `id_banco` bigint(20) UNSIGNED DEFAULT NULL,
  `id_usuario_asignado` bigint(20) UNSIGNED DEFAULT NULL,
  `id_cliente` bigint(20) UNSIGNED NOT NULL,
  `valor_credito` bigint(20) UNSIGNED NOT NULL,
  `entrega_en_efectivo` varchar(2) NOT NULL,
  `tipo_cobro` varchar(20) NOT NULL,
  `num_cuenta` varchar(20) DEFAULT NULL,
  `tipo_cuenta` varchar(20) DEFAULT NULL,
  `periodicidad_cobro` varchar(20) NOT NULL,
  `num_cuotas` bigint(20) UNSIGNED NOT NULL,
  `fec_desembolso` date DEFAULT NULL,
  `fec_pazysalvo` date DEFAULT NULL,
  `nota_cliente` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `creditos`
--

INSERT INTO `creditos` (`id`, `id_credito_estado`, `id_banco`, `id_usuario_asignado`, `id_cliente`, `valor_credito`, `entrega_en_efectivo`, `tipo_cobro`, `num_cuenta`, `tipo_cuenta`, `periodicidad_cobro`, `num_cuotas`, `fec_desembolso`, `fec_pazysalvo`, `nota_cliente`, `createdAt`, `updatedAt`) VALUES
(4, 1, NULL, NULL, 1, 2000, 'SI', 'Efectivo', NULL, NULL, 'Semanal', 5, NULL, NULL, '', '2024-03-05 05:09:47', '2024-03-05 05:09:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credito_bancos`
--

CREATE TABLE `credito_bancos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_credito_bancos` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `credito_bancos`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credito_estados`
--

CREATE TABLE `credito_estados` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_credito_tipo` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `credito_estados`
--

INSERT INTO `credito_estados` (`id`, `nombre_credito_tipo`, `createdAt`, `updatedAt`) VALUES
(1, 'Solicitado', '2024-03-05 02:34:47', '2024-03-05 02:34:31'),
(2, 'Desembolsado', '2024-03-05 02:36:01', '2024-03-05 02:34:42'),
(3, 'Cancelado', '2024-03-05 02:34:58', '2024-03-05 02:34:58'),
(4, 'Paz&Salvo', '2024-03-05 02:35:40', '2024-03-05 02:35:40'),
(5, 'Incompleto', '2024-03-05 02:41:03', '2024-03-05 02:41:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_user_tipo_doc` bigint(20) UNSIGNED NOT NULL,
  `id_user_rol` bigint(20) UNSIGNED NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `num_celular` bigint(20) NOT NULL,
  `num_doc` varchar(20) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `id_user_tipo_doc`, `id_user_rol`, `nombre_completo`, `password`, `email`, `num_celular`, `num_doc`, `direccion`, `activo`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Admin', 'Admin', 'admin@gmail.com', 1232465798, '123465789', 'callle 12#12-!2', 0, '2024-02-05 02:47:16', '2024-02-05 02:42:00'),
(2, 1, 1, 'Admin test', '$2b$10$fR088Y26Fv.dDKH3ACABG.Z7kPDmPGXwAJ.SRPZoeDrcbmsV9Lizq', 'admin@gmail.comm', 12324657987, '1234657898', 'callle 12#12-!2', 1, '2024-02-06 20:25:03', '2024-02-06 20:25:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_rols`
--

CREATE TABLE `user_rols` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_rol` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_rols`
--

INSERT INTO `user_rols` (`id`, `nombre_rol`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', '2024-02-04 15:13:20', '2024-02-04 15:13:20'),
(2, 'Colaborador', '2024-02-04 15:13:30', '2024-02-04 15:13:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_tipo_docs`
--

CREATE TABLE `user_tipo_docs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_tipo_doc` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_tipo_docs`
--

INSERT INTO `user_tipo_docs` (`id`, `nombre_tipo_doc`, `createdAt`, `updatedAt`) VALUES
(1, 'C.C.', '2024-02-05 01:39:27', '2024-02-05 01:39:21'),
(2, 'N.I.T', '2024-02-05 01:41:03', '2024-02-05 01:40:19'),
(3, 'Pasaporte', '2024-02-05 01:41:01', '2024-02-05 01:40:48');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cod_personal` (`cod_personal`),
  ADD UNIQUE KEY `num_celular` (`num_celular`),
  ADD KEY `FK1_id_cliente_tipo` (`id_cliente_tipo`);

--
-- Indices de la tabla `cliente_actividad_ecos`
--
ALTER TABLE `cliente_actividad_ecos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente_infos`
--
ALTER TABLE `cliente_infos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente_sector_ecos`
--
ALTER TABLE `cliente_sector_ecos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `configs`
--
ALTER TABLE `configs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `config_mensajes`
--
ALTER TABLE `config_mensajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `creditos`
--
ALTER TABLE `creditos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `credito_bancos`
--
ALTER TABLE `credito_bancos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `credito_estados`
--
ALTER TABLE `credito_estados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente_actividad_ecos`
--
ALTER TABLE `cliente_actividad_ecos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `cliente_infos`
--
ALTER TABLE `cliente_infos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cliente_sector_ecos`
--
ALTER TABLE `cliente_sector_ecos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `configs`
--
ALTER TABLE `configs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `config_mensajes`
--
ALTER TABLE `config_mensajes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `creditos`
--
ALTER TABLE `creditos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `credito_bancos`
--
ALTER TABLE `credito_bancos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `credito_estados`
--
ALTER TABLE `credito_estados`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;