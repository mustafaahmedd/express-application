const express = require('express');
const userSqlRouter = express.Router();
const userSqlController = require('../../controller/user_sql.controller')

userSqlRouter.get('/',userSqlController.apiGetUsers)

userSqlRouter.get('/:id',userSqlController.apiGetUserById)

userSqlRouter.post('/create',userSqlController.apiCreateUser)

userSqlRouter.put('/update/:id',userSqlController.apiUpdateUser)

userSqlRouter.delete('/delete/:id',userSqlController.apiDeleteUser)


module.exports = userSqlRouter;