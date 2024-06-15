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