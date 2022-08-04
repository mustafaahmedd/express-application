const coinSqlService = require('../services/coin_sql.service')

class coinSqlController {

    static async apiCreateCoin(req, res, next){
        try {
            const body = req.body;
            const response = await coinSqlService.createCoin(body);
            res.json(response);
        } catch (error) {
            throw error;
        }
        next();
    }

    static async apiGetCoin(req, res, next){
        try {
            
        } catch (error) {
            throw error;
        }

        next();

    }

    static async apiUpdateCoin(req, res,next){
        try {
            
        } catch (error) {
            throw error;
        }
        next();
    }

    static async apiDeleteCoin(req, res, next){
        try {
            
        } catch (error) {
            throw error;
        }

        next();
    }

}

module.exports = coinSqlController;