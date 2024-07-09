const express=require('express')

const routes=express.Router();
const userController=require('../controller/user')

routes.get('/user',userController.getUser);

routes.post('/user',userController.addUser);

routes.delete('/user/:id',userController.deleteUser)

module.exports=routes