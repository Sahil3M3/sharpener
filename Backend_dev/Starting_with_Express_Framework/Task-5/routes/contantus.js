const express=require('express')
const path=require('path')
const rootDir=require('../util/path')

const router=express.Router();

router.get('/',(req,res)=>{

    res.sendFile(path.join(rootDir,'views','contantus.html'))
})

router.post('/success',
    (req,res,next)=>{
        res.status(404).sendFile(path.join(rootDir,'views','scuess.html'))
    }
)


module.exports=router;