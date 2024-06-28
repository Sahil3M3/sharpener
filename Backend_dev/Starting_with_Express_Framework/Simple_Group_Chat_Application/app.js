const express=require('express')
const bodyParser=require('body-parser')

const loginRoutes=require('./Routes/login')
const chatRoute=require('./Routes/chat')

const app=express();

app.use(bodyParser.urlencoded({extended:false}))

app.use('/login',loginRoutes)
app.use('/',chatRoute)

app.listen(5500);