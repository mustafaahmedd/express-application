const userService = require('../services/user.service')

class userController {

    static async apiGetAllUsers(req, res, next) {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            const response = await userService.getAllUsers(page, limit);

            return res.json({
                status: 200,
                output: response,
                message: "User data fetched successfuly",
            });

        } catch (error) {
            console.log(error.message);
        }
        next();
    }

    static async apiGetUserById(req, res, next) {

        try {
            const response = await userService.getUserById(req.params.id);

            return res.json(response);
        } catch (error) {
            console.log(error.message);
        }

        next();
    }

    static async apiCreateUser(req, res, next) {

        try {
            if (req.body) {
                const response = await userService.createUser(req.body);
                // console.log(response)
                let { fName, lName, email, phone, age } = response;
                return res.json({
                    status: 200,
                    data: { fName, lName, email, phone, age },
                    message: `${response.fName} added to Database.`
                })
            }

        } catch (err) {
            console.log(err.message);
        }

        next();
    }

    static async apiUpdateUser(req, res, next) {

        try {
            const response = await userService.updateUser(req.params.id, req.body);

            return res.json(response)

        } catch (error) {
            console.log(error.message);
        }

        next();
    }

    static async apiDeleteUser(req, res, next) {
        try {
            const response = await userService.deleteUser(req.params.id);

            return res.json(response)
        } catch (error) {
            console.log(error.message);
        }
        next();
    }

    static async apiSearchInAll(req, res, next) {

        try {
            let query = req.params.key;
            // console.log(query)
            const response = await userService.searchInAll(query);
            return res.json(response);

        } catch (error) {
            console.log(error.message);
        }

        next();
    }

    static async apiSearchQuery(req, res, next) {

        try {
            let query = req.query;
            const response = await userService.searchWithQuery(query);
            return res.json(response)
        } catch (error) {
            console.log(error.message)
        }
    }

}

module.exports = userController;

