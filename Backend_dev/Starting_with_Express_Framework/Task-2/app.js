const http=require("http")

const bodyParser=require('body-parser')

const express=require('express')

const app=express();

app.use(bodyParser.urlencoded({extended:false}));

app.use("/add-product",(req,res)=>{
    console.log("in Add product");
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/product" method="POST" >
        <input type="text" id="title" name="title">
        <button type="submit">Submit</button>
        
    </form>
</body>
</html>`)
})

app.use("/product",(req,res)=>{
    console.log(req.body.title);
    res.redirect("/")
})


app.use("/",(req,res)=>{
    console.log("started the node");
    res.send("welcome to home page")
})





app.listen(5500);