const connection = require('../database/mysql_connection');
const userSqlService = require('../services/user_sql.service')
const coinSqlService = require('../services/coin_sql.service')

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
        else if (quantity <= 0)
            console.log("Quantity can not be negative or Zero.")

        else {
            const total = parseFloat(coinResult.price * quantity);

            if (userResult.balance < total) {
                console.log(`in suffictient balance to buy ${quantity} coin.`)
            }
            else if (coinResult.quantity < quantity) {
                response.status = 400;
                response.data = {}
                response.message = `Inventory doesn't have ${quantity} coins`
            }
            else {

                const findQuery = `SELECT id, quantity FROM buy_coin WHERE userid = ${user_id} && coinid = ${coin_id}`
                const found = await new Promise((resolve, reject) => {
                    connection.query(findQuery, (err, rows, fields) => {
                        if (err) throw err;
                        resolve(rows[0])
                    })
                });

                if (found) {
                    console.log("user found.")
                    found.quantity += quantity;
                    var updQuery = "UPDATE buy_coin SET quantity = " + found.quantity + " WHERE id = " + found.id;
                    connection.query(updQuery, (err, rows, fields) => {
                        if (err) throw err;
                    });
                    var insertQuery = "INSERT INTO history SET  ?";
                    connection.query(insertQuery, { actionId: found.id, price: coinResult.price, quantity: quantity, action: 'BUY COIN.' })

                }
                else {
                    var insertQuery = "INSERT INTO buy_coin SET ?";
                    const data = { userId: user_id, coinId: coin_id, quantity: quantity }
                    connection.query(insertQuery, data, (err, rows, fields) => {
                        if (err) throw err;
                    });
                    const lastUser = await new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM buy_coin ORDER BY ID DESC LIMIT 1', (err, rows, fields) => {
                            if (err) throw err;
                            resolve(rows[0])
                        })
                    })
                    insertQuery = "INSERT INTO history SET  ?";
                    connection.query(insertQuery, { actionId: lastUser.id, price: coinResult.price, quantity: quantity, action: 'BUY COIN.' })
                }

                userResult.balance -= total;
                userResult.coins += quantity;
                var updQuery = "UPDATE users SET balance = " + userResult.balance + ", coins = " + userResult.coins + " WHERE id = " + user_id;
                connection.query(updQuery);

                coinResult.quantity -= quantity;
                updQuery = "UPDATE coins SET quantity = " + coinResult.quantity + " WHERE id = " + coin_id;
                connection.query(updQuery);

                const result = { name: userResult.fname, coin: coinResult.name, price: coinResult.price, quantity: quantity, total_price: total }
                response.status = 200;
                response.data = result;
                response.message = `${userResult.fname} Bought ${quantity} Coins.`
            }
        }

        return response;
    }

    static async sellCoins(user_id, coin_id, quantity) {

        let response = {};
        const userResult = await userSqlService.getUserById(user_id);
        const coinResult = await coinSqlService.getCoinById(coin_id);

        if (!userResult || !coinResult)
            console.log("user or coin not found!!")

        else if (quantity <= 0)
            console.log("Quantity can not be negative or Zero.")

        else {
            const query = "SELECT * FROM buy_coin where userid = " + user_id + " && coinid = " + coin_id
            const check_coins = await new Promise((resolve, reject) => {
                connection.query(query, (err, rows, fields) => {
                    if (err) throw err;
                    resolve(rows[0]);
                })
            })

            if (!check_coins) {
                console.log("user never bought the coin.")
                response.status = 400;
                response.data = {}
                response.message = `${coinResult.name} not found in user's stock.`
            }
            else if (check_coins.quantity < quantity) {
                console.log('User doesnt have enough coins.')
                response.status = 400;
                response.data = {}
                response.message = `Insfficient coins to sell.`
            }
            else {

                const total = (coinResult.price * quantity);
                const profit = (total - (check_coins.price * quantity))

                const findQuery = `SELECT id, quantity FROM sell_coin WHERE userid = ${user_id} && coinid = ${coin_id}`
                const found = await new Promise((resolve, reject) => {
                    connection.query(findQuery, (err, rows, fields) => {
                        if (err) throw err;
                        resolve(rows[0])
                    })
                });

                if (found) {
                    found.quantity += quantity;
                    var updQuery = "UPDATE sell_coin SET quantity = " + found.quantity + " WHERE id = " + found.id;
                    connection.query(updQuery, (err, rows, fields) => {
                        if (err) throw err;
                    });
                    var insertQuery = "INSERT INTO history SET  ?";
                    connection.query(insertQuery, { actionId: found.id, price: coinResult.price, quantity: quantity, action: 'SELL COIN.' })
                }
                else {

                    var insertQuery = "INSERT INTO sell_coin SET ?";
                    const data = { userId: user_id, coinId: coin_id, price: coinResult.price, quantity: quantity }
                    connection.query(insertQuery, data, (err, rows, fields) => {
                        if (err) throw err;
                    });
                    const lastUser = await new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM sell_coin ORDER BY ID DESC LIMIT 1', (err, rows, fields) => {
                            if (err) throw err;
                            resolve(rows[0])
                        })
                    })
                    insertQuery = "INSERT INTO history SET  ?";
                    connection.query(insertQuery, { actionId: lastUser.id, price: coinResult.price, quantity: quantity, action: 'SELL COIN.' })
                }

                userResult.balance += total;
                userResult.coins -= quantity;
                const updUser = "UPDATE users SET balance = " + userResult.balance + ", coins = " + userResult.coins + " WHERE id = " + user_id
                connection.query(updUser);

                coinResult.quantity += quantity;
                const updCoin = "UPDATE coins SET quantity = " + coinResult.quantity + " WHERE id = " + coin_id
                connection.query(updCoin);

                check_coins.quantity -= quantity;
                const updPurchase = "UPDATE buy_coin SET quantity =" + check_coins.quantity + " WHERE id = " + check_coins.id;
                connection.query(updPurchase);

                if (check_coins.quantity == 0) {
                    var delQuery = "DELETE FROM buy_coin WHERE userid = " + user_id + " && coinid = " + coin_id + " && quantity = 0";
                    connection.query(delQuery)
                }
                response.status = 200;
                response.response = {seller: (userResult.fname +userResult.lname) , coin : coinResult.name , buying_price : check_coins.price , selling_price : coinResult.price , profit : profit, quantity :quantity};
                response.message = `${coinResult.name} was successfully sold with profit: ${profit} rs.`
            }
        }
        return response;
    }

}

module.exports = purchaseCoinService;
