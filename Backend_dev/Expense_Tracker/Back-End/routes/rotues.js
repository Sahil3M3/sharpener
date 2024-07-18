const express=require('express')
const router=express.Router();

const userController=require('../controller/userController')

router.post('/signup',userController.postUser);
router.get('/sign',userController.getUser);
router.post('/login',userController.loginUser);

module.exports=router;