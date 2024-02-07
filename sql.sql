-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-02-2024 a las 23:27:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


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
  `email` varchar(100) NOT NULL,
  `num_celular` bigint(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cod_referido` varchar(20) DEFAULT NULL,
  `cod_personal` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `id_cliente_tipo`, `email`, `num_celular`, `password`, `cod_referido`, `cod_personal`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'test001@gmail.com', 0, '$2b$10$Mmym6f49uFclPsvapOPDlOPqzVJKNky/oJnmi9Xnezbs9Cdyn.AgC', '', '972b924adc', '2024-02-06 21:44:51', '2024-02-06 21:44:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_actividad_eco`
--

CREATE TABLE `cliente_actividad_eco` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_actividad_eco` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente_actividad_eco`
--

INSERT INTO `cliente_actividad_eco` (`id`, `nombre_actividad_eco`, `createdAt`, `updatedAt`) VALUES
(1, 'Agricultura', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(2, 'Ganadería', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(3, 'Pesca', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(4, 'Minería', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(5, 'Construcción', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(6, 'Manufactura', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(7, 'Comercio', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(8, 'Transporte', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(9, 'Turismo', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(10, 'Servicios financieros', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(11, 'Educación', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(12, 'Salud', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(13, 'Tecnología de la información', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(14, 'Ingeniería', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(15, 'Consultoría', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(16, 'Servicios legales', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(17, 'Medios de comunicación', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(18, 'Entretenimiento', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(19, 'Arte y cultura', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(20, 'Restauración y hostelería', '2024-02-07 17:16:21', '2024-02-07 17:16:21'),
(21, 'Otro', '2024-02-07 17:17:24', '2024-02-07 17:17:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_info`
--

CREATE TABLE `cliente_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_dpto` bigint(20) NOT NULL,
  `id_ciudad` bigint(20) NOT NULL,
  `id_user_tipo_doc` bigint(20) NOT NULL,
  `nombres_cliente` varchar(100) NOT NULL,
  `apellidos_cliente` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `num_documento` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Nuevo', '2024-02-06 19:19:00', '2024-02-06 19:19:00'),
(2, 'En Estudio', '2024-02-06 19:19:20', '2024-02-06 19:19:20'),
(3, 'Aprobado', '2024-02-06 19:19:38', '2024-02-06 19:19:38'),
(4, 'No Apto', '2024-02-06 19:20:05', '2024-02-06 19:20:05'),
(5, 'Incompleto', '2024-02-06 19:20:51', '2024-02-06 19:20:24');

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
(1, 1, 1, 'Admin', 'Admin', 'admin@gmail.com', 1232465798, '123465789', 'callle 12#12-!2', 0, '2024-02-04 21:47:16', '2024-02-04 21:42:00'),
(2, 1, 1, 'Admin test', '$2b$10$fR088Y26Fv.dDKH3ACABG.Z7kPDmPGXwAJ.SRPZoeDrcbmsV9Lizq', 'admin@gmail.comm', 12324657987, '1234657898', 'callle 12#12-!2', 1, '2024-02-06 15:25:03', '2024-02-06 15:25:03');

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
(1, 'Admin', '2024-02-04 10:13:20', '2024-02-04 10:13:20'),
(2, 'Colaborador', '2024-02-04 10:13:30', '2024-02-04 10:13:30');

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
(1, 'C.C.', '2024-02-04 20:39:27', '2024-02-04 20:39:21'),
(2, 'N.I.T', '2024-02-04 20:41:03', '2024-02-04 20:40:19'),
(3, 'Pasaporte', '2024-02-04 20:41:01', '2024-02-04 20:40:48');

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
-- Indices de la tabla `cliente_actividad_eco`
--
ALTER TABLE `cliente_actividad_eco`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente_info`
--
ALTER TABLE `cliente_info`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente_tipos`
--
ALTER TABLE `cliente_tipos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_tipo_cliente` (`nombre_tipo_cliente`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `num_doc` (`num_doc`),
  ADD UNIQUE KEY `num_celular` (`num_celular`),
  ADD KEY `FK1_id_user_tipo_doc` (`id_user_tipo_doc`),
  ADD KEY `FK1_id_user_rol` (`id_user_rol`);

--
-- Indices de la tabla `user_rols`
--
ALTER TABLE `user_rols`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `user_tipo_docs`
--
ALTER TABLE `user_tipo_docs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_tipo_doc` (`nombre_tipo_doc`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cliente_actividad_eco`
--
ALTER TABLE `cliente_actividad_eco`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `cliente_info`
--
ALTER TABLE `cliente_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente_tipos`
--
ALTER TABLE `cliente_tipos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user_rols`
--
ALTER TABLE `user_rols`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user_tipo_docs`
--
ALTER TABLE `user_tipo_docs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `FK1_id_cliente_tipo` FOREIGN KEY (`id_cliente_tipo`) REFERENCES `cliente_tipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK1_id_user_rol` FOREIGN KEY (`id_user_rol`) REFERENCES `user_rols` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK1_id_user_tipo_doc` FOREIGN KEY (`id_user_tipo_doc`) REFERENCES `user_tipo_docs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
