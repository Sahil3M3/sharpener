const User=require('../models/user')

module.exports.getUser=((req,res,next)=>{
    User.findAll().then(r=>res.send(JSON.stringify(r))).catch(e=>console.log(e));
 
})

module.exports.addUser=(req,res,next)=>{

 const{userName,phone,email}= req.body;

const user={
    userName:userName,
    email:email,
    phone:phone
}

//     console.log(user);

User.create(user)
.then(r=>{
    const id = r.id;  // Extract the id

   // console.log("User created successfully with ID:", id);
    res.status(201).json({id})


})
.catch(e=>console.log(e));

}

module.exports.deleteUser=(rej,res)=>{
    const id=rej.params.id
    console.log( "Id hai "+id);
User.findByPk(id)
.then(user=>{
     user.destroy();
   console.log("Uer Removed");
})
.catch(e=>console.log(e))

}
