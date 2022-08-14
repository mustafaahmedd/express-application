const express = require('express');
const billingRouter = express.Router();
const billingController = require('../../controller/billing.controller')

billingRouter.post('/threeface',billingController.apiThreeFace)

billingRouter.post('/singleface',billingController.apiSingleFace)

module.exports = billingRouter;