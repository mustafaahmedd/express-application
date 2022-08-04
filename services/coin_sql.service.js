const { response } = require('express');
const connection = require('../database/mysql_connection')

class coinSqlService {

    static async createCoin(body) {
        let response = {}
        
        try {
            const data = body;
            console.log(data)
            var query = "INSERT INTO coins SET ?"
            connection.query(query, data, (err, rows, fields) => {
                if (err) throw err;
                else {
                    response.status = 200;
                    // response.data = new Promise((resolve, reject) => {
                    //     connection.query('SELECT  FROM coins WHERE id=?', [results[0].w_id], function (err, res, field) {
                    //         resolve(res[0])
                    //     });
                    // });
                    response.message = `Coin added succesfuuly`

                }
            })


        } catch (err) {
            throw err;
        }
        return response;

    }
}

module.exports = coinSqlService;