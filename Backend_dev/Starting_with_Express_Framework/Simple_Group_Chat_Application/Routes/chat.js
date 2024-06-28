const express=require('express');
const fs=require('fs')
const router=express.Router();

router.get('/',(req,res)=>{

    let fileText= fs.readFileSync('messages.txt', 'utf8');
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="div">${fileText}</div>

    <form action="/" method="POST">
        <input type="text" name="messages" id="messages" />
        <input type="hidden" name="localStorageData" id="localStorageData" />
        <br>
    <button type="submit"> Send</button>
    </form>
 <script>
   

        // Retrieve data from local storage
        const localStorageData = localStorage.getItem('userName');

        // Set the value of the hidden input field to the data from local storage
        document.getElementById('localStorageData').value = localStorageData;
    </script>

</body>
</html>`);
})

router.post('/',(req,res)=>{

const userName=req.body.localStorageData;
const stringfull =`${userName}: ${req.body.messages}\n`;
console.log(stringfull);

fs.appendFile('messages.txt', stringfull, (err) => {
    if (err) {
        console.error("Error writing to file", err);
        res.status(500).send('Server error');
        return;
    }})


    let fileText= fs.readFileSync('messages.txt', 'utf8');
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="div">${fileText}</div>

    <form action="/message" method="POST">
        <input type="text" name="userName" id="userName" />
        <br>
    <button type="submit"> sent</button>
    </form>
</body>
</html>`)
})



module.exports=router;