const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const helmet=require('helmet')
const morgan=require('morgan')
const fs=require('fs');
const path = require('path');

const User=require('./models/user');
const Expense=require('./models/expense')
const Order=require('./models/order')
const FPR=require('./models/ForgotPasswordRequests')
const downloadhistory=require('./models/downloadhistory')

const userRouter=require('./routes/user')
const expenseRouter=require('./routes/expense')
const sequelize=require('./util/database')
const purchaseRouter=require('./routes/purchase')
const passwordRouter=require('./routes/password')
const asscessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),
{flag:'a'} )
app.use(helmet());

app.use(morgan('combined',{stream:asscessLogStream}));
app.use(cors());
app.use(express.json());
app.use('/user',userRouter)
app.use('/expense',expenseRouter);
app.use('/premium',purchaseRouter);
app.use('/password',passwordRouter);
app.use('/',(req,res)=>{
    res.status(404).send("<h1> Not Found</h1>")
})


User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order,{foreignKey:'userId',onDelete:'CASCADE'});
Order.belongsTo(User,{foreignKey:"userId"})

User.hasMany(FPR,{foreignKey:'userId',onDelete:'CASCADE'});
FPR.belongsTo(User,{foreignKey:"userId"});

User.hasMany(downloadhistory,{foreignKey:'userId',onDelete:'CASCADE'});
downloadhistory.belongsTo(User,{foreignKey:"userId"});

sequelize.sync()    
.then(r=>{
    app.listen(5000,()=>{
        console.log("Database is on  And Server is listing on 5000");
    })

})
.catch(e=>{console.log(e)})
