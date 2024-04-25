const purchaseCoinService = require('../services/purchaseCoin.service')

class purchaseCoinController {

    static async apiBuyCoin(req, res, next) {
        try {
            const user_id = req.body.user_id;
            const coin_id = req.body.coin_id;
            const quantity = req.body.quantity;

            const response = await purchaseCoinService.buyCoins(user_id, coin_id, quantity)
            res.json(response)

        } catch (error) {
            console.log(error.message)
        }

        next()
    }

    static async apiSellCoin(req, res, next) {

        try {
            const user_id = req.body.user_id;
            const coin_id = req.body.coin_id;
            const quantity = req.body.quantity;
            const response = await purchaseCoinService.sellCoins(user_id, coin_id, quantity);
            return res.json(response);

        } catch (error) {
            console.log(error.message);
        }
        next();
    }

}

module.exports = purchaseCoinController;