const http=require("http")
const path=require('path');

const bodyParser=require('body-parser')
const errorController=require('./controllers/error')
const express=require('express')

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const contantRoutes=require('./routes/contantus')
const scuessRoutes=require("./routes/scuess")
const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin',adminRoutes);
app.use('/',shopRoutes);
app.use('/shop',shopRoutes);
app.use('/contactus',contantRoutes)
app.use("/success",scuessRoutes)

app.use(errorController.get404)

app.listen(5500);