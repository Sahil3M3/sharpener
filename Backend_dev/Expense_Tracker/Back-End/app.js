const express=require('express');
const app=express();
const cors=require('cors');

const userRouter=require('./routes/rotues')
const sequelize=require('./util/database')

app.use(cors());
app.use(express.json());
app.use('/',userRouter)

sequelize.sync()
.then(r=>{
    app.listen(5000,()=>{
        console.log("Database is on  And Server is listing on 5000");
    })

})
.catch(e=>{console.log(e)})
