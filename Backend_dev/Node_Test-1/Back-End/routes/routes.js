const express=require('express')
const routes=express.Router();
const productController=require('../controller/productController')

routes.get('/',productController.getProduct)

routes.post('/',productController.addProduct)

module.exports=routes;