CREATE SCHEMA `piladora` ;

CREATE TABLE `user` (
  `id` integer PRIMARY KEY,
  `username` varchar(255),
  `password` varchar(255),
  `status` ENUM('A', 'E', 'I'),
  `role` integer,
  `fecha_creacion` date,
  `creado_por` integer
);

CREATE TABLE `role` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `status` ENUM('A', 'E', 'I'),
  `fecha_creacion` date,
  `creado_por` integer
);

alter table `user`
add constraint fk_role
FOREIGN key (`role`)
references role(id);	

CREATE TABLE `producto` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `id_marca` integer,
  `peso` float,
  `precio` float,
  `categoria` ENUM ('blanco','integral'),
  `status` ENUM('A', 'E', 'I'),
  `fecha_creacion` date,
  `creado_por` integer
);


CREATE TABLE `marca` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `id_proveedor` integer,
  `status` ENUM('A', 'E', 'I'),
  `fecha_creacion` date,
  `creado_por` integer
);
alter table producto
add constraint fk_producto
FOREIGN key (id_marca)
references marca(id);	



CREATE TABLE `proveedor` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `identificacion` varchar(255),
  `fecha_creacion` date,
  `creado_por` integer,
  `status` ENUM('A', 'E', 'I')
);

alter table marca
add constraint fk_marca
FOREIGN key (id_proveedor)
references proveedor(id);	


CREATE TABLE `ingresosSalidasStock` (
  `id` integer PRIMARY KEY,
  `id_producto` integer,
  `stock` integer,
  `tipo` enum('ingreso','salida'),
  `fecha_creacion` date,
  `creado_por` integer,
  `status` ENUM('A', 'E', 'I')
);

alter table ingresosSalidasStock
add constraint fk_id_producto
FOREIGN key (id_producto)
references marca(id);


--16/06/2024 cristopher gomez martillo
ALTER TABLE `user` MODIFY COLUMN `id` INT AUTO_INCREMENT;

-- Paso 1: Eliminar la restricción de clave foránea
ALTER TABLE `user` DROP FOREIGN KEY `fk_role`;

-- Paso 2: Modificar la columna id en la tabla role
ALTER TABLE `role` MODIFY COLUMN `id` INT AUTO_INCREMENT;

-- Paso 3: Volver a agregar la restricción de clave foránea
ALTER TABLE `user` ADD CONSTRAINT `fk_role` FOREIGN KEY (`role`) REFERENCES `role`(`id`);


ALTER TABLE `producto` MODIFY COLUMN `id` INT AUTO_INCREMENT;


--1

ALTER TABLE `producto` DROP FOREIGN KEY `fk_producto`;


--2
ALTER TABLE `ingresosSalidasStock` DROP FOREIGN KEY `fk_id_producto`;

--3

ALTER TABLE `marca` MODIFY COLUMN `id` INT AUTO_INCREMENT;

--4

alter table producto
add constraint fk_producto
FOREIGN key (id_marca)
references marca(id);	

--5

alter table ingresosSalidasStock
add constraint fk_id_producto
FOREIGN key (id_producto)
references producto(id);


ALTER TABLE `proveedor` MODIFY COLUMN `id` INT AUTO_INCREMENT;

ALTER TABLE `ingresosSalidasStock` MODIFY COLUMN `id` INT AUTO_INCREMENT;


ALTER TABLE `user`
ADD COLUMN `cedula` VARCHAR(10),
ADD COLUMN `nombre` VARCHAR(200),
ADD COLUMN `apellido` VARCHAR(200);

INSERT INTO `role` (`id`, `name`, `status`, `fecha_creacion`, `creado_por`) 
VALUES (1,'administrador', 'A', '2024-06-26', 1);

INSERT INTO `role` (`id`, `name`, `status`, `fecha_creacion`, `creado_por`) 
VALUES (2,'operador', 'A', '2024-06-26', 1);

--6
INSERT INTO marca (name, id_proveedor, status, fecha_creacion, creado_por) VALUES
('La Favorita', 1, 'A', '2024-07-13', 1),
('Tonicorp', 2, 'A', '2024-07-13', 1),
('Industrias Lácteas Toni', 3, 'A', '2024-07-13', 1),
('La Universal', 4, 'A', '2024-07-13', 1);

use piladora;

INSERT INTO `piladora`.`producto`
(`name`, `id_marca`, `peso`, `precio`, `categoria`, `status`, `fecha_creacion`, `creado_por`)
VALUES
('LFA-ARR-B', 1, 1000, 3.50, 'blanco', 'A', '2024-07-13', 1),
('LFA-ARR-I', 1, 1000, 3.50, 'integral', 'A', '2024-07-13', 1),
('LFA-ARR-B', 1, 1500, 5.00, 'blanco', 'A', '2024-07-13', 1),
('LFA-ARR-I', 1, 1500, 5.00, 'integral', 'A', '2024-07-13', 1),
('LFA-ARR-B', 1, 2000, 6.50, 'blanco', 'A', '2024-07-13', 1),
('LFA-ARR-I', 1, 2000, 6.50, 'integral', 'A', '2024-07-13', 1),
('LFA-ARR-B', 1, 2500, 8.00, 'blanco', 'A', '2024-07-13', 1),
('LFA-ARR-I', 1, 2500, 8.00, 'integral', 'A', '2024-07-13', 1),
('LFA-ARR-B', 1, 3000, 9.50, 'blanco', 'A', '2024-07-13', 1),
('LFA-ARR-I', 1, 3000, 9.50, 'integral', 'A', '2024-07-13', 1),
('TNC-ARR-B', 2, 3500, 11.00, 'blanco', 'A', '2024-07-13', 1),
('TNC-ARR-I', 2, 3500, 11.00, 'integral', 'A', '2024-07-13', 1),
('TNC-ARR-B', 2, 4000, 12.50, 'blanco', 'A', '2024-07-13', 1),
('TNC-ARR-I', 2, 4000, 12.50, 'integral', 'A', '2024-07-13', 1),
('TNC-ARR-B', 2, 4500, 14.00, 'blanco', 'A', '2024-07-13', 1),
('TNC-ARR-I', 2, 4500, 14.00, 'integral', 'A', '2024-07-13', 1),
('TNC-ARR-B', 2, 5000, 15.50, 'blanco', 'A', '2024-07-13', 1),
('TNC-ARR-I', 2, 5000, 15.50, 'integral', 'A', '2024-07-13', 1),
('TNC-ARR-B', 2, 5500, 17.00, 'blanco', 'A', '2024-07-13', 1),
('TNC-ARR-I', 2, 5500, 17.00, 'integral', 'A', '2024-07-13', 1),
('TNC-ARR-B', 2, 6000, 18.50, 'blanco', 'A', '2024-07-13', 1),
('TNC-ARR-I', 2, 6000, 18.50, 'integral', 'A', '2024-07-13', 1),
('UNI-ARR-B', 4, 6500, 20.00, 'blanco', 'A', '2024-07-13', 1),
('UNI-ARR-I', 4, 6500, 20.00, 'integral', 'A', '2024-07-13', 1),
('UNI-ARR-B', 4, 7000, 21.50, 'blanco', 'A', '2024-07-13', 1),
('UNI-ARR-I', 4, 7000, 21.50, 'integral', 'A', '2024-07-13', 1),
('UNI-ARR-B', 4, 7500, 23.00, 'blanco', 'A', '2024-07-13', 1),
('UNI-ARR-I', 4, 7500, 23.00, 'integral', 'A', '2024-07-13', 1),
('UNI-ARR-B', 4, 8000, 24.50, 'blanco', 'A', '2024-07-13', 1),
('UNI-ARR-I', 4, 8000, 24.50, 'integral', 'A', '2024-07-13', 1),
('UNI-ARR-B', 4, 8500, 26.00, 'blanco', 'A', '2024-07-13', 1),
('UNI-ARR-I', 4, 8500, 26.00, 'integral', 'A', '2024-07-13', 1),
('ILT-ARR-B', 3, 5000, 15.50, 'blanco', 'A', '2024-07-13', 1),
('ILT-ARR-I', 3, 5000, 15.50, 'integral', 'A', '2024-07-13', 1),
('ILT-ARR-B', 3, 5500, 17.00, 'blanco', 'A', '2024-07-13', 1),
('ILT-ARR-I', 3, 5500, 17.00, 'integral', 'A', '2024-07-13', 1),
('ILT-ARR-B', 3, 6000, 18.50, 'blanco', 'A', '2024-07-13', 1),
('ILT-ARR-I', 3, 6000, 18.50, 'integral', 'A', '2024-07-13', 1),
('ILT-ARR-B', 3, 6500, 20.00, 'blanco', 'A', '2024-07-13', 1),
('ILT-ARR-I', 3, 6500, 20.00, 'integral', 'A', '2024-07-13', 1),
('ILT-ARR-B', 3, 7000, 21.50, 'blanco', 'A', '2024-07-13', 1),
('ILT-ARR-I', 3, 7000, 21.50, 'integral', 'A', '2024-07-13', 1),
('ILT-ARR-B', 3, 7500, 23.00, 'blanco', 'A', '2024-07-13', 1),
('ILT-ARR-I', 3, 7500, 23.00, 'integral', 'A', '2024-07-13', 1),
('ILT-ARR-B', 3, 8000, 24.50, 'blanco', 'A', '2024-07-13', 1),
('ILT-ARR-I', 3, 8000, 24.50, 'integral', 'A', '2024-07-13', 1),
('ILT-ARR-B', 3, 8500, 26.00, 'blanco', 'A', '2024-07-13', 1),
('ILT-ARR-I', 3, 8500, 26.00, 'integral', 'A', '2024-07-13', 1);


-- FORENKEY PROVEEDOR
use piladora;
alter table marca
add constraint fk_marca
FOREIGN key (id_proveedor)
references proveedor(id);

