const path=require('path');
const rootDir=require('../util/path')

const express=require('express');

const router=express.Router();

router.get("/add-product",(req,res)=>{
    console.log("in Add product");
    res.sendFile(path.join(rootDir,'views','add-product.html'))
})

router.post("/add-product",(req,res)=>{
    console.log(req.body.title);
    res.redirect("/")
})


module.exports=router; 