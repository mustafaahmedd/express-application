const coinSqlService = require('../services/coin_sql.service')

class coinSqlController {

    static async apiCreateCoin(req, res, next) {
        try {
            const body = req.body;
            const response = await coinSqlService.createCoin(body);
            return res.json(response);

        } catch (error) {
            console.log(error.message);
        }
        next();
    }

    static async apiGetAllCoins(req, res, next) {

        try {
            const response = await coinSqlService.getCoins();
            return res.json({ status: 200, data: response, message: 'fetched all coins.' });

        } catch (error) {
            console.log(error.message);
        }

        next();

    }

    static async apiUpdateCoin(req, res, next) {

        try {
            const body = req.body;
            const id = req.params.id;
            const response = await coinSqlService.updateCoin(id, body)
            return res.json(response);

        } catch (error) {
            console.log(error.message);
        }

        next();
    }

    static async apiDeleteCoin(req, res, next) {
        try {
            const id = req.params.id;
            const response = await coinSqlService.deleteCoin(id);
            return res.json(response);

        } catch (error) {
            console.log(error.message);;
        }

        next();
    }

    static async apiGetCoinById(req, res, next) {
        try {
            const id = req.params.id;

            const response = await coinSqlService.getCoinById(id)
            if(response)
               return res.json({status:200,data:response,message:'coin found.'})
            else    
               return res.json({status:400,data:{},message:'coin not found.'})
            
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = coinSqlController;