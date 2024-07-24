const User=require('../models/user')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


module.exports.postUser=(req,res,next)=>{

    const{email,phone,password,name}=req.body;
const salt=5;
    bcrypt.hash(password,salt,(err,hash)=>{
        const user={
            email:email,
            phone:phone,
            password:hash,
            total_cost:0,
            name:name
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
    })


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
            return res.status(404).json({msg:"User Not found"});
        }
        else
         {
            bcrypt.compare(password,u.password,(err,response)=>{
              
if(err)
{
    res.status(500).json({msg:"Server went Down "})
}

                if(response===true)
                    {
                                    const msg="Login sucessfull";
                                    return res.status(200).json({msg:msg,token:generateToken(u.id)});
                     }
                     else{
                        return res.status(401).json({msg:"User not authorized"});
                     }

            });

               }
    })
    .catch(e=>{
        res.status(409).json({e})
    })
}

function generateToken(id)
{
    const key="Your_Key";

    return jwt.sign({userId:id},key);
}