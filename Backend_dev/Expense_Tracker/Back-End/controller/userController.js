const User=require('../models/user')
module.exports.postUser=(req,res,next)=>{

    const{email,phone,password}=req.body;

    const user={
        email:email,
        phone:phone,
        password:password
    }
User.create(user)
.then(r=>{
   // console.log(r);
   const msg="User is Added";
   return res.status(201).json({msg});
}
)
.catch(e=>
{
    
   return res.status(409).json({e})
}
)

}
module.exports.getUser=(req,res,next)=>{
    console.log("in get");
}

module.exports.loginUser=(req,res,next)=>{
 
    
    const{email,password}=req.body;


    User.findOne({where:{email:email}})
    .then(r=>{
        return r;
    })
    .then(u=>{
        if(!u)
        {
            return res.status(200).json({msg:"User Not Found"});
        }
        else
        {
                  if(u.password===password)
                  {
                    const msg="Login sucessfull";
                    return res.status(200).json({msg:msg});
                  }
                  else{
                    return res.status(200).json({msg:"Incorrect Password"});
                  }
        }
    })
    .catch(e=>{
        res.status(409).json({e})
    })
}