const http=require("http")
const fs = require('fs');

const server=http.createServer((req,res)=>{


    if(req.url==='/')
        {

            let fileText= fs.readFileSync('message.txt', 'utf8');

            res.write(`<html lang="en">
<head>
    
    <title>Document</title>
</head>
<body>
  <div>
        ${fileText}
    </div>
    <form action="/message" method="POST">
        <input type="text" name="message">
        <button type="submit" >Submit</button>
        
    </form>
</body>`)
return res.end();
        }

        if (req.url === '/message' && req.method === 'POST') {
            const body = [];
            req.on('data', (chunk) => {
              console.log(chunk);
              body.push(chunk);
            });
            req.on('end', () => {
              const parsedBody = Buffer.concat(body).toString();
              const message = parsedBody.split('=')[1];
              fs.writeFileSync('message.txt', message);
            });
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
          }


res.setHeader('Content-Type',"text/html");

res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <title>My first Code</title>
</head>
<body>
    Hello
</body>
</html>`)   

res.end();
})



server.listen(5500);