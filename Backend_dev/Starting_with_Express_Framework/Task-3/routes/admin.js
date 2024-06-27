const express=require('express');

const router=express.Router();

router.get("/add-product",(req,res)=>{
    console.log("in Add product");
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/admin/add-product" method="POST" >
        <input type="text" id="title" name="title">
        <button type="submit">Submit</button>
        
    </form>
</body>
</html>`)
})

router.post("/add-product",(req,res)=>{
    console.log(req.body.title);
    res.redirect("/")
})


module.exports=router; 