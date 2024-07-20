USE PILADORA;

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

ALTER TABLE `user`
ADD COLUMN `cedula` VARCHAR(10),
ADD COLUMN `nombre` VARCHAR(200),
ADD COLUMN `apellido` VARCHAR(200);

ALTER TABLE `producto` MODIFY COLUMN `id` INT AUTO_INCREMENT;

ALTER TABLE `marca` MODIFY COLUMN `id` INT AUTO_INCREMENT;

ALTER TABLE `user` MODIFY COLUMN `id` INT AUTO_INCREMENT;

ALTER TABLE `role` MODIFY COLUMN `id` INT AUTO_INCREMENT;

ALTER TABLE `proveedor` MODIFY COLUMN `id` INT AUTO_INCREMENT;

ALTER TABLE `ingresosSalidasStock` MODIFY COLUMN `id` INT AUTO_INCREMENT;



alter table `user`
add constraint fk_role
FOREIGN key (`role`)
references role(id);	

alter table marca
add constraint fk_marca
FOREIGN key (id_proveedor)
references proveedor(id);

alter table producto
add constraint fk_producto
FOREIGN key (id_marca)
references marca(id);	

alter table ingresosSalidasStock
add constraint fk_id_producto
FOREIGN key (id_producto)
references producto(id);


INSERT INTO `role` (`id`, `name`, `status`, `fecha_creacion`, `creado_por`) 
VALUES (1,'administrador', 'A', '2024-06-26', 1);

INSERT INTO `role` (`id`, `name`, `status`, `fecha_creacion`, `creado_por`) 
VALUES (2,'operador', 'A', '2024-06-26', 1);


INSERT INTO `piladora`.`user`
( `username`, `password`, `cedula`, `nombre`, `apellido`, `status`, `fecha_creacion`, `creado_por`, `role`)
VALUES
('admin1', 'adminpass1', '1234567890', 'Juan', 'Pérez', 'A', '2024-07-19', 1, 1),  -- Admin
('op1', 'opass1', '1234567892', 'Carlos', 'Lopez', 'A', '2024-07-19', 2, 2),    -- Operador
('op2', 'opass2', '1234567893', 'Laura', 'Martínez', 'A', '2024-07-19', 2, 2),   -- Operador
('op3', 'opass3', '1234567894', 'Pedro', 'Rodríguez', 'A', '2024-07-19', 2, 2);   -- Operador


INSERT INTO `piladora`.`proveedor` 
(`name`, `identificacion`, `fecha_creacion`, `creado_por`, `status`)
VALUES 
('Proveedor Alfa', '1234567890', '2024-07-19', 1, 'A'),
('Proveedor Beta', '2345678901', '2024-07-19', 1, 'A'),
('Proveedor Gamma', '3456789012', '2024-07-19', 1, 'A'),
('Proveedor Delta', '4567890123', '2024-07-19', 1, 'A'),
('Proveedor Epsilon', '5678901234', '2024-07-19', 1, 'A');

INSERT INTO marca (name, id_proveedor, status, fecha_creacion, creado_por) VALUES
('La Favorita', 1, 'A', '2024-07-13', 1),
('Tonicorp', 2, 'A', '2024-07-13', 1),
('Industrias Lácteas Toni', 3, 'A', '2024-07-13', 1),
('La Universal', 4, 'A', '2024-07-13', 1);


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


-- SP GUARDAR PRODUCTO

use piladora;

DELIMITER //

CREATE PROCEDURE AddNewProductAndStock (
    IN p_name VARCHAR(255),
    IN p_proveedor_id INT,
    IN p_marca_name VARCHAR(255),
    IN p_peso FLOAT,
    IN p_precio FLOAT,
    IN p_categoria ENUM('blanco', 'integral'),
    IN p_status ENUM('A', 'E', 'I'),
    IN p_creado_por INT,
    IN p_stock INT,
    IN p_tipo ENUM('ingreso', 'salida')
)
BEGIN
    DECLARE p_id_marca INT;
    DECLARE p_id_producto INT;

    -- Buscar el id de la marca usando el id del proveedor y el nombre de la marca
    SELECT id INTO p_id_marca
    FROM marca
    WHERE id_proveedor = p_proveedor_id
      AND name = p_marca_name;

    -- Si no se encuentra la marca, devolver un error
    IF p_id_marca IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Marca no encontrada para el proveedor especificado';
    END IF;

    -- Insertar el nuevo producto
    INSERT INTO producto (name, id_marca, peso, precio, categoria, status, fecha_creacion, creado_por)
    VALUES (p_name, p_id_marca, p_peso, p_precio, p_categoria, p_status, CURDATE(), p_creado_por);

    -- Obtener el ID del producto recién insertado
    SET p_id_producto = LAST_INSERT_ID();

    -- Insertar el stock en la tabla ingresossalidasstock
    INSERT INTO ingresossalidasstock (id_producto, stock, tipo, fecha_creacion, creado_por, status)
    VALUES (p_id_producto, p_stock, p_tipo, CURDATE(), p_creado_por, p_status);

END //

DELIMITER ;
