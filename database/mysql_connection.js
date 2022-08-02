const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "express-db"
})

con.connect((err) => {
    if (err) throw err
    console.log("my SQL connected.")
})


module.exports = con;