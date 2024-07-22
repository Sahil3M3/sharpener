const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();


const User=require('./models/user');
const Expense=require('./models/expense')
const Order=require('./models/order')

const userRouter=require('./routes/user')
const expenseRouter=require('./routes/expense')
const sequelize=require('./util/database')
const purchaseRouter=require('./routes/purchase')

app.use(cors());
app.use(express.json());
app.use('/user',userRouter)
app.use('/expense',expenseRouter);
app.use('/premium',purchaseRouter);


User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order,{foreignKey:'userId',onDelete:'CASCADE'});
Order.belongsTo(User,{foreignKey:"userId"})



sequelize.sync()    
.then(r=>{
    app.listen(5000,()=>{
        console.log("Database is on  And Server is listing on 5000");
    })

})
.catch(e=>{console.log(e)})
