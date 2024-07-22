const jwt=require('jsonwebtoken')
const User=require('../models/user')

const authenticate=(req,res,next)=>{

    const token=req.headers.authorization;
  
    if(!token)
    {
        res.status(403).json({msg:"No token provided"});
    }
    else
    {
        const key="Your_Key";
        const id=jwt.verify(token,key);
       
        User.findByPk(id.userId)
        .then(r=>{
            if(!r)
            {
                return res.status(500).json({ msg: 'Failed to authenticate token' });
            }
            else
            return r;
        })
        .then(u=>{
          
            req.user=u;
            next();
        })
        .catch(e=>console.log(e))
    }


}

module.exports=authenticate;