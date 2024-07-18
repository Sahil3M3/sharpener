const express=require('express')
const routes=express.Router();
const productController=require('../controller/productController')

routes.get('/',productController.getProduct)

routes.post('/',productController.addProduct)
routes.delete(`/:id`,productController.deleteProduct)
routes.put('/:id',productController.editProduct);
module.exports=routes;