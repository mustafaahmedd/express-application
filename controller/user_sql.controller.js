const userSqlService = require('../services/user_sql.service')

class userSqlController {

    static async apiGetUsers(req, res, next) {

        try {
            const response = await userSqlService.getAllUsers();
            return res.json({ status: 200, Users: response, msg: 'Data Fetched Successfully.' });

        } catch (error) {
            console.log(error.message);
        }
        next();
    }

    static async apiGetUserById(req, res, next) {

        try {
            const id = req.params.id;
            const response = await userSqlService.getUserById(id);
            if (response)
                return res.json({ status: 200, user: response, message: "User Found successfully." })
            else
                return res.json({ status: 400, user: {}, message: "User Found Failed." })
        } catch (error) {
            console.log(error.message);
        }

        next();
    }

    static async apiCreateUser(req, res, next) {

        try {
            const body = req.body;
            const response = await userSqlService.createUser(body);
            if (response)
                return res.json(response)
            else
                return res.json({ status: 400, user: { response }, message: "User couldn't be created." })

        } catch (error) {
            console.log(error.message);
        }

        next();
    }

    static async apiUpdateUser(req, res, next) {

        try {
            const id = req.params.id;
            const body = req.body;
            console.log(body)
            if (body !== null) {
                const response = await userSqlService.updateUser(id, body);
                if (response)
                    return res.json(response);
                else
                    return res.json({ status: 400, updated_user: {}, message: "error occured." })
            }
            else {
                return res.json({ status: 400, message: 'No data to update.' })
            }

        } catch (error) {
            console.log(error.message);
        }
        next();
    }

    static async apiDeleteUser(req, res, next) {

        try {
            const id = req.params.id;
            const response = await userSqlService.deleteUser(id);
            if (response)
                return res.json(response)
            return res.json({status: 400 , message :'user deletion failed.'})
        } catch (error) {
            console.log(error.message);
        }

        next();
    }

}

module.exports = userSqlController;