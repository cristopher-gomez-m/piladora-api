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
