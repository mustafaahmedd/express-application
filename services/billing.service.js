/*
--

*/
class billingService {

    static singleFaceBill(units) {

        let rate = 11.23;
        if (units < 0)
            return "No bill."
        else if (units <= 400)
            return (units * rate)

        else if (units <= 600) {
            rate = 14.62;
            return ((400 * 11.23) + (units - 400) * rate);
        }
        else if (units <= 750) {
            rate = 17.45;
            return ((400 * 11.23) + (200 * 14.62) + (units - 600) * rate);
        }
        else if (units <= 900) {
            rate = 20
            return ((400 * 11.23) + (200 * 17.62) + (150 * 17.45) + (units - 750) * rate);
        }
        else {
            rate = 22.8
            return ((400 * 11.23) + (200 * 17.62) + (150 * 17.45) + (150 * 20) + (units - 900) * rate);

        }

    }

    static threeFaceBill(units) {

        let rate = 22.75;

        if (units < 0)
            return "No bill."

        else if (units > 0 && units < 500)
            return (units * rate);

        else if (units > 500 && units < 1000) {
            rate = 25.0;
            return (500 * 22.75) + (units - 500) * rate;
        }
        else if (units > 1000 && units < 1500) {
            rate = 27.10;
            return (500 * 22.75) + (500 * 25.0) + (units - 1000) * rate;
        }
        else if (units > 1500 && units < 2000) {
            rate = 29.48;
            return (500 * 22.75) + (500 * 25.0) + (500 * 27.10) + (units - 1500) * rate;
        }
        else {
            rate = 33.37;
            return (500 * 22.75) + (500 * 25.0) + (500 * 27.10) + (500 * 29.48) + (units - 2000) * rate;
        }
        // 11,375 12500 13550 14740  - 85093.5
    }

}

module.exports = billingService;