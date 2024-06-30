const path=require('path')
const rootDir=require('../util/path')

exports.postScuess=(req,res,next)=>{
    setTimeout(()=>{
        res.redirect('/');
            },40000);
    res.status(404).sendFile(path.join(rootDir,'views','scuess.html'))
};