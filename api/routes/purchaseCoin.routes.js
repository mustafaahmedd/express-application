const express = require('express');
const purchaseCoinRouter = express.Router();
const purchaseCoinController = require('../../controller/purchaseCoin.controller')

purchaseCoinRouter.post('/buycoin',purchaseCoinController.apiBuyCoin)

purchaseCoinRouter.post('/sellcoin',purchaseCoinController.apiSellCoin);

module.exports = purchaseCoinRouter;