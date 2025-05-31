const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '12345678', 
    database: 'MLearning'
});

connection.connect((err) => {
    if (err) {
        console.error("Kết nối thất bại", err);
    } else {
        console.log("Kết nối thành công");
    }
});

module.exports = connection;
