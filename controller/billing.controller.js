const billingService = require('../services/billing.service')

class billingController {

    static apiSingleFace(req, res, next) {

        const units = req.body.units;
        const response = billingService.singleFaceBill(units);
        return res.json({ status: 200, Total_bill: response +" PKR", message: "Single face Bill calculated successfully." })

    }

    static apiThreeFace(req, res, next) {

        const units = req.body.units;
        const response = billingService.threeFaceBill(units);
        return res.json({ status: 200, Total_bill: response +" PKR", message: "Three face Billcd  calculated successfully." })

    }
}

module.exports = billingController;