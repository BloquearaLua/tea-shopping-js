const mysql = require('mysql');
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "123456",
    database: 'tea_shopping',
    multipleStatements: true,
})

module.exports = conn;