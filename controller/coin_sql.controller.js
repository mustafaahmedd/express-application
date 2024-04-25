const coinSqlService = require('../services/coin_sql.service')

class coinController {

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
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 4;
            let response ={};

            if(page && limit){
                response = await coinSqlService.paginatedResults(page, limit);
            }
            else{
                response = await coinSqlService.getCoins();
            }

            return res.send({ status: 200, data: response, message: response.message });

        } catch (error) {
            console.log("Error: ",error.message);
        }

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
            if (response)
                return res.json({ status: 200, data: response, message: 'coin found.' })
            else
                return res.json({ status: 400, data: {}, message: 'coin not found.' })

        } catch (error) {
            console.log(error.message);
        }
        next();
    }

    static async paginatedResults(req, res, next) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 4;

            const response = await coinSqlService.paginatedResults(page, limit);
            // console.log("response:", response);
            return res.send({ status: 200, data: response, message: response.message });

        } catch (error) {
            console.log(error.message);
        }

    }
}

module.exports = coinController;