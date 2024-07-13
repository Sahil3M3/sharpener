const Sequelize=require('sequelize')

const sequelize=require('../util/database')

 Product=sequelize.define('product',{
id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
},
productName:{
    type:Sequelize.STRING,
    allowNull:false,    

},
description:{
    type:Sequelize.STRING,
    allowNull:false
},
price:{
    type:Sequelize.BIGINT,
    allowNull:false
},
quantity:{
    type:Sequelize.BIGINT,
    allowNull:false
}
})

module.exports=Product