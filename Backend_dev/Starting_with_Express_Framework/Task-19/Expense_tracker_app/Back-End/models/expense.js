const Sequelize=require('sequelize')

const sequelize=require('../util/database')

Expense=sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    expenseAmount:{
        type:Sequelize.BIGINT,
        allowNull:false
    },
    Description:{
        type:Sequelize.STRING,
        allowNull:false

    },
    type:{
        type:Sequelize.ENUM,
        values:['Food','Movie','Pertol','Bills'],
        allowNull:false
    }
})
module.exports=Expense