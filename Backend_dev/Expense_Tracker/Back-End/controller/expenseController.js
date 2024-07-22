const Expense=require('../models/expense')

module.exports.getExpense=(req,res,next)=>{
    console.log(req.user);
    if(req.user.ispremium===true)
{
    Expense.findAll({where:{userId:req.user.id}})
    .then(r=>res.send(JSON.stringify(r)))
    .catch(e=>{console.log(e)})
}
else
{
    res.status(200).json({check:"false"})
}
}

module.exports.addExpense=(req,res,next)=>{
    const {expenseAmount,Description,type}=req.body;

   

const userId= req.user.id

const expense={
    expenseAmount:expenseAmount,
    Description:Description,
    type:type,
    userId:userId
}
Expense.create(expense)
.then(r=>{
    const id=r.id;
    res.status(201).json({id});
})
.catch(e=>console.log(e))
}
module.exports.deleteExpense=(req,res,next)=>{
    id=req.params.id
    console.log(id);

    Expense.findByPk(id)
    .then(e=>{
        e.destroy();
    })
    .catch(e=>console.log(e))
}

module.exports.putExpense=(req,res,next)=>
{
    id=req.params.id
    console.log(id);
    const {expenseAmount,Description,type}=req.body;

    Expense.findByPk(id)
    .then(e=>{
     e.expenseAmount=expenseAmount;
     e.Description=Description;
     e.type=type;
     e.save();
     return res.status(203).json({msg:"success"});
    })
    .catch(e=>console.log(e))
}