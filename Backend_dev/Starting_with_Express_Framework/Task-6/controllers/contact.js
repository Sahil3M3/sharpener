const path=require('path')
const rootDir=require('../util/path')


exports. getContact=(req,res)=>{

    res.sendFile(path.join(rootDir,'views','contantus.html'))
}