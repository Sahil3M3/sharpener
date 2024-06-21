const http=require("http")

const server=http.createServer((req,res)=>{

    let contain="";    
    if(req.url==='/home')
contain="Welcome home";
    else if(req.url==='/about')
        contain='Welcome to About Us page';
    else if(req.url==='/node')
        contain='Welcome to my Node Js project';

res.setHeader('Content-Type',"text/html");

res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <title>My first Code</title>
</head>
<body>
    ${contain}
</body>
</html>`)   

res.end();
})



server.listen(5500);