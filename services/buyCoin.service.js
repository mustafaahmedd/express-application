const connection = require('../database/mysql_connection')

class buyCoinService {    
    static async buyCoins(user_id, coin_id, quantity) {
        const coinResult = await new Promise(function(resolve, reject) {
            connection.query('SELECT * FROM coins WHERE id=?', coin_id, function(err, res, field) {
                if (err) throw reject(err)
                resolve(res[0]);
            })
        });

        if(!userResult){
            console.log("user not found")
        }
        else if(!coinResult){
            console.log("coin not found")
        }
        else{
            if(userResult.balance < coin.price){
                console.log("in suffictioent balance")
            }
            else{
                // kaam karo

                // this is dev branch commit
            }
        }

    }
}

module.exports = buyCoinService;
