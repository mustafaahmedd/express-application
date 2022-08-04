const buyCoinService = require('../services/buyCoin.service')

class buyCoinController {

    static async apiBuyCoin(req, res, next){
        try {
            const user_id = req.body.user_id;
            const coin_id = req.body.coin_id;
            const quantity = req.body.quantity;
            
            const response = await buyCoinService.buyCoins(user_id,coin_id,quantity)
            // console.log('response: ',response);
            res.json(response)
            
        } catch (error) {
            console.log(error.message)
        }

        next()
    }    

}

module.exports = buyCoinController;