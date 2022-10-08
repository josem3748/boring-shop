CREATE DATABASE mibase;
SHOW DATABASES;
USE mibase;
CREATE TABLE usuarios (nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255) NOT NULL, edad INTEGER UNSIGNED, email VARCHAR(255) NOT NULL, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id));
SELECT * FROM usuarios;
INSERT INTO usuarios (nombre, apellido, edad, email) VALUES ('Juan', 'Perez', 23, 'jp@gmail.com');
INSERT INTO usuarios (nombre, apellido, edad, email) VALUES ('Pedro', 'Mei', 21, 'pm@gmail.com');
INSERT INTO usuarios (nombre, apellido, edad, email) VALUES ('Juana', 'Suarez', 25, 'js@gmail.com');
SELECT * FROM usuarios;
DELETE FROM usuarios WHERE usuarios.id = 2;
SELECT * FROM usuarios;
UPDATE usuarios SET edad = 24 WHERE usuarios.id = 1;
SELECT * FROM usuarios;
DROP DATABASE mibase;
SHOW DATABASES;


CREATE DATABASE ecommerce;
USE ecommerce;
SHOW TABLES;
SELECT * FROM articulos;

CREATE DATABASE desafio_7;
USE desafio_7;
SHOW TABLES;
SELECT * FROM productos;
DELETE FROM productos WHERE productos.id = 4;