const express=require('express');
const authenticate = require('../middleware/auth');
const router=express.Router();
const purchaseController=require('../controller/purchaseController')

router.get('/',authenticate,purchaseController.premiummembership);
router.post('/',authenticate,purchaseController.updateMembership);

module.exports=router;
 