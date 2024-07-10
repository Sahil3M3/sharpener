const Expense=require('../models/expense')

module.exports.getExpense=(req,res,next)=>{

    Expense.findAll()
    .then(r=>res.send(JSON.stringify(r)))
    .catch(e=>{console.log(e)})
}

module.exports.addExpense=(req,res,next)=>{
    const {expenseAmount,Description,type}=req.body;

    const expense={
        expenseAmount:expenseAmount,
        Description:Description,
        type:type,
    }
console.log(expense);

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
    })
    .catch(e=>console.log(e))
}