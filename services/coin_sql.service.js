const connection = require('../database/mysql_connection')

class coinSqlService {

    static async createCoin(body) {
        let response = {}

        try {
            const data = body;
            var query = "INSERT INTO coins SET ?";
            connection.query(query, data, (err, rows, fields) => {
                if (err) throw err;
            })
            response.status = 200;
            response.coin = await new Promise((resolve, reject) => {
                connection.query('SELECT * FROM coins ORDER BY ID DESC LIMIT 1', (err, rows, field) => {
                    if (err) throw reject(err)
                    resolve(rows[0]);
                })
            });
            response.message = `Coin added succesfuuly`

        } catch (err) {
            throw err;
        }
        return response;
    }

    static async deleteCoin(id) {
        let response = {}

        try {
            const coin = await new Promise((resolve, reject) => {
                connection.query('SELECT * FROM coins WHERE id = ?', id, (err, res, field) => {
                    if (err) throw reject(err)
                    resolve(res[0]);
                })
            });
            if (!coin) {
                console.log("not found.")
                response.status = 400;
                response.coin = {};
                response.message = `coin not found with id: ${id}`
            }

            else {
                var query = "DELETE FROM coins WHERE id = ?";
                connection.query(query, id, (err, rows, fields) => {
                    if (err) throw err;
                })
                response.status = 200,
                    response.coin = coin;
                response.message = "Coin deleted Successfully."
            }
        } catch (error) {
            console.log(error.message);
        }
        return response;
    }

    static async updateCoin(id, body) {
        let response = {}

        try {
            const found = await this.getCoinById(id);
            const newPrice = body.price ? body.price : found.price;
            const newQuantity = body.quantity ? body.quantity : found.quantity;

            let updQuery = "UPDATE coins SET price = " + newPrice + ", quantity = " + newQuantity + " WHERE id = " + id;
            connection.query(updQuery, (err, rows, fields) => {
                if (err) throw err;
                // we can't set response here if we want to return it
                //it takes some time and return before the result.
                
            });
            response.status = 200;
            response.data = { price: newPrice, stock: newQuantity }
            response.message = `coin updated successfully with new price: ${newPrice}.`

        } catch (error) {
            console.log(error.message);
        }
        return response;
    }

    static async getCoins() {
        try {
            const getQuery = "SELECT * FROM coins"
            const result = await new Promise((resolve, reject) => {
                connection.query(getQuery, (err, rows, fields) => {
                    if (err) throw err;
                    resolve(rows)
                })
            });
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getCoinById(id) {
        try {
            const getQuery = "SELECT * FROM coins WHERE id = ?"
            const result = await new Promise((resolve, reject) => {
                connection.query(getQuery, id, (err, rows, fields) => {
                    if (err) throw err;
                    resolve(rows[0])
                })
            });
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = coinSqlService;