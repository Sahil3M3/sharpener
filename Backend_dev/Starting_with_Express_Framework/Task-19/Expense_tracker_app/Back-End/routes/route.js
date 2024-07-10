const express=require('express')
const routes=express.Router();
const expenseController=require('../controller/expenseController')


routes.get('/',expenseController.getExpense);
routes.post('/',expenseController.addExpense);
routes.delete(`/:id`,expenseController.deleteExpense)
routes.put('/:id',expenseController.putExpense);
module.exports=routes;
