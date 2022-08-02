const { json } = require("express/lib/response");
const coinService = require("../services/coin.service");

class CoinController {

    static async apiCreateCoin(req, res, next) {
        try {
            if (req.body) {
                const coin = await coinService.createCoin(req.body);
                return res.render("create", { status: 200, response: coin });
                // return res.json({
                //     status: 200,
                //     coin: coin,
                //     message: "Coin created."
                // })
            }
        } catch (err) {
            console.log(err.message);
        }
        next();
    }

    static async apiGetAllCoins(req, res, next) {
        try {
            const response = await coinService.getAllCoins();
            return res.render('index', { status: 200, coins: response, message: 'data fetched successfuly' })
            // return res.json({
            //     status: 200,
            //     data: response,
            //     message: "data fetched successfuly",
            // });
        } catch (err) {
            console.log(err.message);
        }

        next();
    }

    static async apiGetCoinById(req, res, next) {
        try {
            const response = await coinService.getById(req.params);
            return res.json(response);
        } catch (err) {
            console.log(err.message);
        }
        next();
    }

    static async apiUpdateCoin(req, res, next) {
        try {
            const updCoin = await coinService.editCoin(req.params.id, req.body);
            res.render('edit', { coins :response })
            // return res.json(response);

        } catch (error) {
            console.log(error.message);
        }

        next();
    }

    static async apiDeleteCoin(req, res, next) {
        try {
            const response = await coinService.deleteCoin(req.params.id);
            return res.json(response);
        } catch (error) {
            console.log(error.message);
        }

        next();
    }

}

module.exports = CoinController;
