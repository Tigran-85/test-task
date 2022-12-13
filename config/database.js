const { createConnection } = require('mysql');

const mysql = createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "sJEL6zyFdMn!7GV&9HaX",
    database: "test",
    connectionLimit: 10
})

module.exports = mysql;