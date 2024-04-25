const express = require('express')
const coinSqlRouter = express.Router();
const coinSqlController = require('../../controller/coin_sql.controller')

coinSqlRouter.get('/',coinSqlController.apiGetAllCoins);

// coinSqlRouter.get('/:key',coinSqlController.paginatedResults)

coinSqlRouter.post('/create',coinSqlController.apiCreateCoin);

coinSqlRouter.delete('/delete/:id',coinSqlController.apiDeleteCoin);

coinSqlRouter.put('/update/:id',coinSqlController.apiUpdateCoin);

coinSqlRouter.get('/:id',coinSqlController.apiGetCoinById);

module.exports = coinSqlRouter;