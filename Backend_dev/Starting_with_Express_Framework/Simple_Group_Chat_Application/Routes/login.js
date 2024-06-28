const express=require('express');

const router=express.Router();

router.get('/',(req,res)=>{

res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form onsubmit="handleSubmit(event)">
        <input type="text" name="userName" id="userName" />
        <br>
    <button type="submit"> Login</button>
    </form>
    <script>
function handleSubmit(e)
{

   e.preventDefault();
    const userName=document.getElementById('userName').value;
    
    
    localStorage.setItem("userName",userName);

     window.location.href = '/';

}

    </script>
</body>
</html> `)    
});

module.exports=router;