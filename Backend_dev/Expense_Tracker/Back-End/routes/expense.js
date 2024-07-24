const expenseController=require('../controller/expenseController')
const authenticate=require('../middleware/auth')
const express=require('express')
const router=express.Router();

router.get('/',authenticate,expenseController.getExpense);
router.post('/',authenticate,expenseController.addExpense);
router.delete('/:id',authenticate,expenseController.deleteExpense)
router.put('/:id',authenticate,expenseController.putExpense);
router.get('/board',authenticate,expenseController.showLeaderboard)

module.exports=router;