const buyCoinService = require('../services/buyCoin.service')

class buyCoinController {

    static apiBuyCoin(req, res, next){
        try {
            const user_id = req.body.user_id;
            const coin_id = req.body.coin_id;
            const quantity = req.body.quantity;
            
            const response = buyCoinService.buyCoins(user_id,coin_id,quantity)
            
        } catch (error) {
            console.log(error.message)
        }

        next()
    }

}

module.exports = buyCoinController;