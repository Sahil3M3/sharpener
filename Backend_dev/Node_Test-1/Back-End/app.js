const express=require('express')
const cors=require('cors')

const app=express();
const productRoutes=require('./routes/routes')

app.use(express.json());
app.use(cors())
app.use('/',productRoutes)

app.listen(5000);