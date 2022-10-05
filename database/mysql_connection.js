const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react"
})

con.connect((err) => {
    if (err) throw err
    console.log("my SQL Server Connected.")
})

module.exports = con;