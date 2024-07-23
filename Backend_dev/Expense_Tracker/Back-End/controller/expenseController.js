const Expense=require('../models/expense')
const User=require('../models/user')
const Sequelize=require('sequelize')
const sequelize = require('../util/database')

module.exports.getExpense=(req,res,next)=>{

    Expense.findAll({where:{userId:req.user.id}})
    .then(r=>res.send(JSON.stringify(r)))
    .catch(e=>{console.log(e)})

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
module.exports.showLeaderboard=async (req,res,next)=>{
    console.log("in board");

    try {
        const topUser = await User.findAll({
            attributes: [
              'id',"name",
              [Sequelize.fn('sum', Sequelize.col('expenseAmount')), 'total_cost']
        ],include:[{
            model:Expense,
            attributes:[]
        }],group:["users.id"],
        order:[["total_cost",'DESC'] ]
          });
               res.status(200).json(topUser);

      } catch (error) {
        console.error('Error fetching top users:', error);
        res.status(500).json({ error: 'Internal server error' });
      }


}