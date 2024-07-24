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

const userId= req.user.id;
User.findByPk(userId)
.then(u=>{
    
    if(u.total_cost)
    {
    u.total_cost+= Number(expenseAmount);
    }
    else
    {
        u.total_cost=0;
        u.total_cost+= Number(expenseAmount);
    }
    u.save().then(r=>{
    }
    ).catch(e=>console.log(e))
})
.catch(e=>console.log(e))

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

module.exports.deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
  //  console.log("yooo "+id);
    try {
        // Find the expense by its primary key
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({ msg: "Expense not found" });
        }

        const expenseAmount = Number(expense.expenseAmount);

        // Find the user by their primary key
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Deduct the expense amount from the user's total cost
        user.total_cost -= expenseAmount;

        // Save the updated user details
        await user.save();

       
        await expense.destroy();

        return res.status(203).json({ msg: "Expense removed successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        return res.status(500).json({ msg: "An error occurred while deleting the expense" });
    }
};


module.exports.putExpense = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const { expenseAmount, Description, type } = req.body;

    try {
        console.log(`Finding expense with id: ${id}`);
        const expense = await Expense.findByPk(id);

        if (!expense) {
            console.log("Expense not found");
            return res.status(404).json({ msg: "Expense not found" });
        }

        const oldExpenseAmount = Number(expense.expenseAmount);
        console.log(`Old expense amount: ${oldExpenseAmount}`);

        expense.expenseAmount = expenseAmount;
        expense.Description = Description;
        expense.type = type;
        await expense.save();
        console.log("Expense updated");

        console.log(`Finding user with id: ${userId}`);
        const user = await User.findByPk(userId);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }

        user.total_cost -= oldExpenseAmount;
        user.total_cost += Number(expenseAmount);
        await user.save();
        console.log("User total cost updated");

        return res.status(203).json({ msg: "Expense updated successfully" });
    } catch (error) {
        console.error("Error updating expense:", error);
        return res.status(500).json({ msg: "An error occurred while updating the expense" });
    }
};

module.exports.showLeaderboard=async (req,res,next)=>{
    console.log("in board");

    try {
        const topUser = await User.findAll({
            attributes: [
              'id',"name",'total_cost'
        ],
        order:[["total_cost",'DESC'] ]
          });
          return     res.status(200).json(topUser);

      } catch (error) {
        console.error('Error fetching top users:', error);
       return  res.status(500).json({ error: 'Internal server error' });
      }


}