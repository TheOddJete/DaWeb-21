const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'daweb'
});

pool.getConnection((error, connection) => {
    if(error){
        console.error('ERROR AL CONECTAR CON LA BD: ', error.code);
    }

    if(connection){
        connection.release();
        console.log('CONEXIÓN CON ÉXITO A LA BD');
        return;
    }
});

module.exports = pool;

