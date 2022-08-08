const db = require('../database/mysql_connection');

class userSqlService {

    static async getAllUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                db.query(`SELECT * FROM users`, (err, rows, fields) => {
                    if (err) throw err;
                    resolve(rows)
                })
            })
            return response;

        } catch (error) {
            console.log(error.message);
        }

    }

    static async getUserById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                db.query(`SELECT * FROM users WHERE id = ?`, id, (err, rows, fields) => {
                    if (err) throw err;

                    resolve(rows[0]);
                })
            })
            return response;

        } catch (error) {
            console.log(error.message)
        }
    }

    static async createUser(body) {
        let response = {};

        try {
            const { fname, lname, email, phone, balance, age, location } = body;

            if (!fname || !lname || !email || !phone || !balance || !age || !location) {
                console.log("Incomplete details.")
            }
            else {
                var query = `INSERT INTO users SET ? `
                const data = {
                    fname: fname, lname: lname,
                    email: email, phone: phone, balance: balance,
                    age: age, location: location
                }

                db.query(query, data, (err, rows, fields) => {
                    if (err) throw err;
                })

                response.status = 200;
                response.user = await new Promise((resolve, reject) => {
                    db.query('SELECT * FROM users ORDER BY ID DESC LIMIT 1', (err, rows, field) => {
                        if (err) throw reject(err)
                        resolve(rows[0]);
                    })
                });
                response.message = `User added succesfuuly`
            }

        } catch (error) {
            console.log(error.message);
        }
        return response;
    }

    static async updateUser(userId, body) {

        const updUser = body;
        let response = {}
        try {
            // console.log(updUser)
            // if (!updUser) {
            //     response.status = 500;
            //     response.message = "No data to update."
            // }
            // else {
            const found = await this.getUserById(userId);
            if (found) {
                const fname = updUser.fname ? updUser.fname : found.fname
                const lname = updUser.lname ? updUser.lname : found.lname
                const email = updUser.email ? updUser.email : found.email
                const phone = updUser.phone ? updUser.phone : found.phone
                const balance = updUser.balance ? updUser.balance : found.balance
                const coins = updUser.coins ? updUser.coins : found.coins
                const age = updUser.age ? updUser.age : found.age
                const location = updUser.location ? updUser.location : found.location

                const updQuery = "UPDATE users SET fname = '" + fname + "'  , lname = '" + lname + "', phone = " + phone + ", balance = " + balance + ", coins = " + coins + ", age = " + age + ", location = '" + location + "' WHERE id = " + userId;
                // const updQuery = "UPDATE USERS SET ?"
                // const data = { fname: fname, lname: lname, phone: phone, balance: balance, age: age, coins: coins,location:location }
                db.query(updQuery, (err, rows, fields) => {
                    if (err) throw err;
                })
                response.status = 200;
                response.updated_user = await this.getUserById(userId);
                response.message = `User ${fname} Updated Successfully.`
                // }
            }

        } catch (error) {
            console.log(error.message)
        }
        return response;
    }
    static async deleteUser(id) {
        let response = {};
        try {
            const found = await this.getUserById(id);
            if (found) {
                db.query('DELETE FROM users WHERE id = ?', id, (err, rows, fields) => {
                    if (err) throw err;
                })
                response.status = 200,
                    response.user = found;
                response.message = "User deleted Successfully."
            }
            else {
                response.status = 400;
                response.user = {};
                response.message = `User not found with id: ${id}`
            }
        } catch (error) {
            console.log(error.message);
        }
        return response;
    }

}

module.exports = userSqlService;