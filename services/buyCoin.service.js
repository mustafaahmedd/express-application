const connection = require('../database/mysql_connection')

class buyCoinService {

    static async buyCoins(user_id, coin_id, quantity) {
        
        //ham ne coin user ko khareewaakr response bhejna ha.
        let response = {};
        //we need user with the id and then we need user's balance 
        const userResult = await new Promise((resolve, reject) => {
            connection.query('SELECT balance, fname FROM users WHERE id=?', user_id, function (err, res, field) {
                if (err) throw reject(err)
                resolve(res[0]);
            })
        });

        //we need coin with the id and then we need coin's price 
        const coinResult = await new Promise((resolve, reject) => {
            connection.query('SELECT price, quantity  FROM coins WHERE id=?', coin_id, function (err, res, field) {
                if (err) throw reject(err)
                resolve(res[0]);
            })
        });

        //agar balance nahin tw back krdoo 
        if (!userResult || !coinResult) {
            console.log("user or coin not found!!")
        }
        // else if(!coinResult){
        //     console.log("coin not found")
        // }

        else {
            let total = (coinResult.price * quantity);

            if (userResult.balance < total) {
                response.status = 400;
                response.data = {}
                response.message = `in suffictient balance to buy ${quantity} coin.`
            }
            else {

                var insertQuery = "INSERT INTO buy_coin SET ?";
                const data = { userId: user_id, coinId: coin_id, quantity: quantity }
                connection.query(insertQuery, data, (err, rows, fields) => {
                    if (err) throw err;
                });

                userResult.balance -= total;
                // console.log(`new balance is : ${userResult.balance}`)
                var updQuery = "UPDATE users SET balance = " + userResult.balance + " WHERE id = " + user_id;
                connection.query(updQuery);

                coinResult.quantity -= quantity;
                updQuery = "UPDATE coins SET quantity = " + coinResult.quantity + " WHERE id = " + coin_id;
                connection.query(updQuery);

                response.status = 200;
                response.data = {
                    userId: user_id,
                    coinId: coin_id,
                    price: coinResult.price,
                    quantity: quantity
                }
                response.message = `User Bought the Coin.`
            }
        }
        return response;
    }
}

module.exports = buyCoinService;
