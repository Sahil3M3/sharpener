const express=require('express')
const cors=require('cors')
const app=express();
const companyRotues=require('./routes/routes')
const sequelize=require('./util/database')

app.use(cors());
app.use(express.json());
app.use('/',companyRotues);

sequelize.sync()
.then(r=>{
    console.log("Database is Connected");
})
.catch(e=>console.log(e))
app.listen(5000);