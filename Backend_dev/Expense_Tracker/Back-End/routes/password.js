const express=require('express');
const router=express.Router();
const passwordController=require('../controller/passwordController');


router.post('/forgotpassword',passwordController.forgotPassword);
router.post('/resetpassword/:id',passwordController.resetPassword)

module.exports=router;