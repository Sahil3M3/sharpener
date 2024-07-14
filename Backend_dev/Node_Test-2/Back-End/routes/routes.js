const express=require("express")
const router=express.Router();
const reviewController=require('../controller/controller')

router.get(`/:search`,reviewController.getReview);
router.post('/',reviewController.postReview);

module.exports=router;