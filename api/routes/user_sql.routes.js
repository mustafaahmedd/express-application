const express = require('express');
const UserRouter = express.Router();
const userSqlController = require('../../controller/user_sql.controller')

UserRouter.get('/',userSqlController.apiGetUsers)

UserRouter.get('/:id',userSqlController.apiGetUserById)

UserRouter.post('/create',userSqlController.apiCreateUser)

UserRouter.put('/update/:id',userSqlController.apiUpdateUser)

UserRouter.delete('/delete/:id',userSqlController.apiDeleteUser)


module.exports = UserRouter;