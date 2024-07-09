const express=require('express');
const cors=require('cors')
const bodyParser=require('body-parser')
const sequelize=require('./util/database')

const app=express();
const userRoutes=require('./routes/user');


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/',userRoutes);

sequelize.sync().then().catch(e=>console.log(e));

app.listen(5000)