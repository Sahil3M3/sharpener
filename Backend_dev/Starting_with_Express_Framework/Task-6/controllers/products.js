const path=require('path');
const rootDir=require('../util/path')

exports.getAddProduct=(req,res,next)=>{
    console.log("in Add product");
    res.sendFile(path.join(rootDir,'views','add-product.html'))
}

exports.postAddProduct=(req,res)=>{
    console.log(req.body.title);
    res.redirect("/")
}

exports.getProduct=(req,res)=>{
    console.log("started the node");
    res.sendFile(path.join(rootDir,'views','shop.html'))
}