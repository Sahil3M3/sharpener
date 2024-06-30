const express=require('express')
const path=require('path')
const rootDir=require('../util/path')

const router=express.Router();

const successController=require('../controllers/scuess')

router.post('/',successController.postScuess);


module.exports=router;