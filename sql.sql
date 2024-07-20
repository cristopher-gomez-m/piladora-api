use piladora;

CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255),
  `password` VARCHAR(255),
  `status` ENUM('A', 'E', 'I'),
  `role` INT,
  `fecha_creacion` DATE,
  `creado_por` INT,
  `cedula` VARCHAR(10),
  `nombre` VARCHAR(200),
  `apellido` VARCHAR(200)
);

CREATE TABLE `role` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `status` ENUM('A', 'E', 'I'),
  `fecha_creacion` DATE,
  `creado_por` INT
);

CREATE TABLE `proveedor` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `identificacion` VARCHAR(255),
  `fecha_creacion` DATE,
  `creado_por` INT,
  `status` ENUM('A', 'E', 'I')
);

CREATE TABLE `marca` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `id_proveedor` INT,
  `status` ENUM('A', 'E', 'I'),
  `fecha_creacion` DATE,
  `creado_por` INT,
  FOREIGN KEY (id_proveedor) REFERENCES proveedor(id)
);

CREATE TABLE `producto` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `id_marca` INT,
  `peso` FLOAT,
  `precio` FLOAT,
  `categoria` ENUM('blanco', 'integral'),
  `status` ENUM('A', 'E', 'I'),
  `fecha_creacion` DATE,
  `creado_por` INT,
  FOREIGN KEY (id_marca) REFERENCES marca(id)
);

CREATE TABLE `ingresosSalidasStock` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `id_producto` INT,
  `stock` INT,
  `tipo` ENUM('ingreso', 'salida'),
  `fecha_creacion` DATE,
  `creado_por` INT,
  `status` ENUM('A', 'E', 'I'),
  FOREIGN KEY (id_producto) REFERENCES producto(id)
);

ALTER TABLE `user`
ADD CONSTRAINT fk_role FOREIGN KEY (`role`) REFERENCES `role`(`id`);



use piladora;

-- Insertar Roles
INSERT INTO `role` (`name`, `status`, `fecha_creacion`, `creado_por`) VALUES
('Admin', 'A', '2024-07-19', 1),
('Operador', 'A', '2024-07-19', 1);

-- Insertar Usuarios
INSERT INTO `user` (`username`, `password`, `cedula`, `nombre`, `apellido`, `status`, `role`, `fecha_creacion`, `creado_por`) VALUES
('admin1', 'password1', '0101010101', 'Admin', 'One', 'A', 1, '2024-07-19', 1),
('operador1', 'password2', '0202020202', 'Operador', 'One', 'A', 2, '2024-07-19', 1),
('admin2', 'password3', '0303030303', 'Admin', 'Two', 'A', 1, '2024-07-19', 1),
('operador2', 'password4', '0404040404', 'Operador', 'Two', 'A', 2, '2024-07-19', 1),
('admin3', 'password5', '0505050505', 'Admin', 'Three', 'A', 1, '2024-07-19', 1);

-- Insertar Proveedores
INSERT INTO `proveedor` (`name`, `identificacion`, `fecha_creacion`, `creado_por`, `status`) VALUES
('Proveedor Uno', '1001001001', '2024-07-19', 1, 'A'),
('Proveedor Dos', '2002002002', '2024-07-19', 1, 'A'),
('Proveedor Tres', '3003003003', '2024-07-19', 1, 'A'),
('Proveedor Cuatro', '4004004004', '2024-07-19', 1, 'A'),
('Proveedor Cinco', '5005005005', '2024-07-19', 1, 'A');

-- Insertar Marcas
INSERT INTO `marca` (`name`, `id_proveedor`, `status`, `fecha_creacion`, `creado_por`) VALUES
('Marca Uno', 1, 'A', '2024-07-19', 1),
('Marca Dos', 1, 'A', '2024-07-19', 1),
('Marca Tres', 2, 'A', '2024-07-19', 1),
('Marca Cuatro', 3, 'A', '2024-07-19', 1),
('Marca Cinco', 3, 'A', '2024-07-19', 1),
('Marca Seis', 4, 'A', '2024-07-19', 1),
('Marca Siete', 5, 'A', '2024-07-19', 1),
('Marca Ocho', 5, 'A', '2024-07-19', 1);

-- Insertar Productos
INSERT INTO `producto` (`name`, `id_marca`, `peso`, `precio`, `categoria`, `status`, `fecha_creacion`, `creado_por`) VALUES
('Producto A Blanco', 1, 1000, 3.50, 'blanco', 'A', '2024-07-19', 1),
('Producto A Integral', 1, 1000, 3.50, 'integral', 'A', '2024-07-19', 1),
('Producto B Blanco', 2, 1500, 5.00, 'blanco', 'A', '2024-07-19', 1),
('Producto B Integral', 2, 1500, 5.00, 'integral', 'A', '2024-07-19', 1),
('Producto C Blanco', 3, 2000, 6.50, 'blanco', 'A', '2024-07-19', 1),
('Producto C Integral', 3, 2000, 6.50, 'integral', 'A', '2024-07-19', 1),
('Producto D Blanco', 4, 2500, 8.00, 'blanco', 'A', '2024-07-19', 1),
('Producto D Integral', 4, 2500, 8.00, 'integral', 'A', '2024-07-19', 1),
('Producto E Blanco', 5, 3000, 9.50, 'blanco', 'A', '2024-07-19', 1),
('Producto E Integral', 5, 3000, 9.50, 'integral', 'A', '2024-07-19', 1),
('Producto F Blanco', 6, 3500, 11.00, 'blanco', 'A', '2024-07-19', 1),
('Producto F Integral', 6, 3500, 11.00, 'integral', 'A', '2024-07-19', 1),
('Producto G Blanco', 7, 4000, 12.50, 'blanco', 'A', '2024-07-19', 1),
('Producto G Integral', 7, 4000, 12.50, 'integral', 'A', '2024-07-19', 1),
('Producto H Blanco', 8, 4500, 14.00, 'blanco', 'A', '2024-07-19', 1),
('Producto H Integral', 8, 4500, 14.00, 'integral', 'A', '2024-07-19', 1);

-- Insertar Ingresos y Salidas de Stock
INSERT INTO `ingresosSalidasStock` (`id_producto`, `stock`, `tipo`, `fecha_creacion`, `creado_por`, `status`) VALUES
(1, 100, 'ingreso', '2024-07-19', 1, 'A'),
(2, 150, 'ingreso', '2024-07-19', 1, 'A'),
(3, 200, 'ingreso', '2024-07-19', 1, 'A'),
(4, 250, 'ingreso', '2024-07-19', 1, 'A'),
(5, 300, 'ingreso', '2024-07-19', 1, 'A'),
(6, 350, 'ingreso', '2024-07-19', 1, 'A'),
(7, 400, 'ingreso', '2024-07-19', 1, 'A'),
(8, 450, 'ingreso', '2024-07-19', 1, 'A'),
(1, 50, 'salida', '2024-07-19', 1, 'A'),
(2, 60, 'salida', '2024-07-19', 1, 'A'),
(3, 70, 'salida', '2024-07-19', 1, 'A'),
(4, 80, 'salida', '2024-07-19', 1, 'A'),
(5, 90, 'salida', '2024-07-19', 1, 'A'),
(6, 100, 'salida', '2024-07-19', 1, 'A'),
(7, 110, 'salida', '2024-07-19', 1, 'A'),
(8, 120, 'salida', '2024-07-19', 1, 'A');
