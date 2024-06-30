const express=require('express')
const path=require('path')
const rootDir=require('../util/path')

const router=express.Router();

const contactController=require('../controllers/contact')
router.get('/',contactController.getContact);

router.post('/success',
    (req,res,next)=>{
        setTimeout(()=>{
            res.redirect('/');
                },40000);
        res.status(404).sendFile(path.join(rootDir,'views','scuess.html'))
    }
 
)


module.exports=router;