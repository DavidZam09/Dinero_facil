
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-05:00";


-- Volcando estructura de base de datos para dinero_facil
CREATE DATABASE IF NOT EXISTS `dinero_facil` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `dinero_facil`;

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
	(1, 'Almacén / Logística / Transporte', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(2, 'Administración / Oficina', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(3, 'Ventas', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(4, 'Contabilidad / Finanzas', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(5, 'Producción / Operarios / Manufactura', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(6, 'CallCenter / Telemercadeo', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(7, 'Medicina / Salud', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(8, 'Atención a clientes', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(9, 'Servicios Generales, Aseo y Seguridad', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(10, 'Mantenimiento y Reparaciones Técnicas', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(11, 'Hostelería / Turismo', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(12, 'Construcción y obra', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(13, 'Recursos Humanos', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(14, 'Informática / Telecomunicaciones', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(15, 'Compras / Comercio Exterior', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(16, 'Investigación y Calidad', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(17, 'Mercadotecnia / Publicidad / Comunicación', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(18, 'Ingeniería', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(19, 'Legal / Asesoría', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(20, 'Docencia', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(21, 'Dirección / Gerencia', '2024-02-08 03:47:52', '2024-02-08 03:47:52'),
	(22, 'Otros', '2024-02-08 03:47:52', '2024-02-08 03:47:52');

-- Volcando estructura para tabla dinero_facil.cliente_info
CREATE TABLE IF NOT EXISTS `cliente_info` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
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

-- Volcando datos para la tabla dinero_facil.cliente_info: ~0 rows (aproximadamente)

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
	(1, 'Explotación de minas y canteras', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(2, 'Actividades de apoyo a la gestión pública', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(3, 'Telecomunicaciones', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(4, 'Actividades profesionales y técnicas', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(5, 'Manufactura', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(6, 'Financieras y de seguros (excepto bancos, cooperat', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(7, 'Artes, entretenimiento y recreación', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(8, 'Agricultura y pesca', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(9, 'Banca', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(10, 'Suministro de electricidad, gas, y A/C', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(11, 'Distribución de agua y saneamiento Salud humana y ', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(12, 'Comercio', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(13, 'Transporte y almacenamiento', '2024-02-08 03:53:31', '2024-02-08 03:53:31'),
	(14, 'Otro', '2024-02-08 03:53:31', '2024-02-08 03:53:31');

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


