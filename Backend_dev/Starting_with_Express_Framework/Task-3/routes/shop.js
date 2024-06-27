const express=require('express');

const router=express.Router();


router.get("/",(req,res)=>{
    console.log("started the node");
    res.send("welcome to home shope")
})


module.exports=router;