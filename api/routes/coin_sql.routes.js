const express = require('express')
const coinSqlRouter = express.Router();
const coinSqlController = require('../../controller/coin_sql.controller')

coinSqlRouter.post('/',coinSqlController.apiCreateCoin)


module.exports = coinSqlRouter;