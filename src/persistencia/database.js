const mysql = require('mysql');
const { promisify }= require('util');

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'daweb'
});

pool.getConnection((error, connection) => {
    if(error){
        console.error('Error al conectar con la base de datos: ', error.code);
    }

    if(connection){
        connection.release();
        console.log('Base de datos conectada correctamente');
    }
})

pool.query = promisify(pool.query);

pool.query(
    "CREATE TABLE usuarios (id INT NOT NULL AUTO_INCREMENT, nombre VARCHAR(45) NOT NULL, apellidos VARCHAR(45) NOT NULL, usuario VARCHAR(45) NOT NULL, contrasena VARCHAR(45) NOT NULL, email VARCHAR(45) NOT NULL, credito DOUBLE NOT NULL, provincia ENUM('Alicante', 'Barcelona', 'Sevilla', 'Valencia', 'Madrid', 'Murcia') NOT NULL, PRIMARY KEY (id));", (err, res) => {});


pool.query("CREATE TABLE productos ( id INT NOT NULL AUTO_INCREMENT, nombre VARCHAR(45) NOT NULL, precio DOUBLE NOT NULL, descripcion VARCHAR(100) NOT NULL, imagen VARCHAR(100) NOT NULL, fecha DATE NOT NULL, categoria ENUM('Ropa', 'Tecnologia', 'Deportes', 'Juegos', 'Otros') NOT NULL, estado ENUM('Nuevo', 'PocoUso', 'Bueno', 'Decente', 'Malo') NOT NULL, visualizaciones INT NOT NULL, usuario INT NOT NULL, comprador INT NULL DEFAULT NULL, cambiado_por INT NULL DEFAULT NULL, PRIMARY KEY (id), INDEX cambiado_por_idx (usuario ASC) VISIBLE, INDEX comprador_idx (comprador ASC) VISIBLE, CONSTRAINT usuario FOREIGN KEY (usuario) REFERENCES usuarios (id) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT comprador FOREIGN KEY (comprador) REFERENCES usuarios (id) ON DELETE NO ACTION ON UPDATE NO ACTION);", (err, res) => {});


pool.query("ALTER TABLE productos ADD CONSTRAINT cambiado_por FOREIGN KEY (cambiado_por) REFERENCES productos (id) ON DELETE NO ACTION ON UPDATE NO ACTION;", (err, res) => {});

module.exports = pool;
