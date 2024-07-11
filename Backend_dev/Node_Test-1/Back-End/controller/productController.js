module.exports.getProduct=(rej,res,next)=>{
    console.log("hey");
    res.send("hi")
}

module.exports.addProduct=(rej,res,next)=>{
    console.log(rej.body);
    res.send("hi")
}