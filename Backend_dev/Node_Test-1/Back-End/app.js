const express=require('express')
const cors=require('cors')
const sequelize=require('./util/database')
const app=express();
const productRoutes=require('./routes/routes')

app.use(express.json());
app.use(cors())
app.use('/',productRoutes)

sequelize.sync()
.then(r=> console.log("Database is on") )
.catch(e=> console.log(e));
app.listen(5000);