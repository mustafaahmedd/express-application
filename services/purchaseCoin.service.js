const connection = require('../database/mysql_connection');

class purchaseCoinService {

    static async buyCoins(user_id, coin_id, quantity) {

        let response = {};
        const userResult = await new Promise((resolve, reject) => {
            connection.query('SELECT balance, fname ,coins FROM users WHERE id=?', user_id, (err, res, field) => {
                if (err) throw reject(err)
                resolve(res[0]);
            })
        });

        const coinResult = await new Promise((resolve, reject) => {
            connection.query('SELECT *  FROM coins WHERE id=?', coin_id, (err, res, field) => {
                if (err) throw reject(err)
                resolve(res[0]);
            })
        });

        if (!userResult || !coinResult) {
            console.log("user or coin not found!!")
        }

        else {
            let total = (coinResult.price * quantity);

            if (userResult.balance < total) {
                response.status = 400;
                response.data = {}
                response.message = `in suffictient balance to buy ${quantity} coin.`
            }
            else if (coinResult.quantity < quantity) {
                response.status = 400;
                response.data = {}
                response.message = `Inventory doesn't have ${quantity} coins`
            }
            else {
                const findQuery = `SELECT id, quantity FROM buy_coin WHERE userid = ${user_id} && coinid = ${coin_id} && price = ${coinResult.price}`
                const id = await new Promise((resolve, reject) => {
                    connection.query(findQuery, (err, rows, fields) => {
                        if (err) throw err;
                        resolve(rows[0])
                    })
                });

                if (id) {
                    id.quantity += quantity;
                    var insertQuery = "UPDATE buy_coin SET quantity = " + id.quantity + " WHERE id = " + id.id;
                    connection.query(insertQuery, (err, rows, fields) => {
                        if (err) throw err;
                    });
                }
                else {
                    var insertQuery = "INSERT INTO buy_coin SET ?";
                    const data = { userId: user_id, coinId: coin_id, price: coinResult.price, quantity: quantity }
                    connection.query(insertQuery, data, (err, rows, fields) => {
                        if (err) throw err;
                    });

                }

                userResult.balance -= total;
                userResult.coins += quantity;
                var updQuery = "UPDATE users SET balance = " + userResult.balance + ", coins = " + userResult.coins + " WHERE id = " + user_id;
                connection.query(updQuery);

                coinResult.quantity -= quantity;
                updQuery = "UPDATE coins SET quantity = " + coinResult.quantity + " WHERE id = " + coin_id;
                connection.query(updQuery);
                const result = { name: userResult.fname, coin: coinResult.name, price: coinResult.price }

                response.status = 200;
                response.data = result;
                response.message = `User ${userResult.fname} Bought the Coin.`
            }
        }
        return response;
    }

    static async sellCoins(seller_id, coin_id, quantity) {

        let response = {};
        const userResult = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id = ?', seller_id, (err, rows, fields) => {
                if (err) throw err;

                resolve(rows[0]);
            })
        })

        const coinResult = await new Promise((resolve, reject) => {
            connection.query('SELECT name , price , quantity FROM coins WHERE id = ?', coin_id, (err, rows, fields) => {
                if (err) throw err;

                resolve(rows[0]);
            })
        })

        if (!userResult || !coinResult) {
            console.log("user or coin not found!!")
        }

        else {
            const query = "SELECT * FROM buy_coin where userid = " + seller_id + " && coinid = " + coin_id
            const check_coins = await new Promise((resolve, reject) => {
                connection.query(query, (err, rows, fields) => {
                    if (err) throw err;
                    resolve(rows[0]);
                })
            })

            if (!check_coins) {
                response.status = 400;
                response.data = {}
                response.message = `${coinResult.name} not found in user's stock.`
            }
            else if (check_coins.quantity < quantity) {
                console.log('quantity issues')
                response.status = 400;
                response.data = {}
                response.message = `Insfficient coins to sell.`
            }
            else {

                const total = (coinResult.price * quantity);
                let profit = (total - (check_coins.price * quantity))

                console.log(total);
                console.log(profit);

                userResult.balance += total;
                userResult.coins -= quantity;
                const updUser = "UPDATE users SET balance = " + userResult.balance + ", coins = " + userResult.coins + " WHERE id = " + seller_id
                connection.query(updUser);

                coinResult.quantity += quantity;
                const updCoin = "UPDATE coins SET quantity = " + coinResult.quantity + " WHERE id = " + coin_id
                connection.query(updCoin);

                check_coins.quantity -= quantity;
                const updPurchase = "UPDATE buy_coin SET quantity =" + check_coins.quantity + " WHERE id = " + check_coins.id;
                connection.query(updPurchase);

                if (check_coins.quantity == 0) {
                    var delQuery = "DELETE FROM buy_coin WHERE userid = " + seller_id + " && coinid = " + coin_id + " && quantity = 0";
                    connection.query(delQuery)
                }
                response.status = 200;
                response.profit = profit;
                response.message = `${coinResult.name} was successfully traded with profit of ${profit} rs.`
            }
        }
        return response;
    }

}

module.exports = purchaseCoinService;
