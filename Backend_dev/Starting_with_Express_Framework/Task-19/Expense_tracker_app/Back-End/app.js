const express=require('express');
const app=express();
const sequelize=require('./util/database')

const cors=require('cors')
const expenseroute=require('./routes/route')


app.use(cors());
app.use(express.json());
app.use('/expenseroute',expenseroute);

sequelize.sync().then().catch(e=>console.log(e));


app.listen(5000)

