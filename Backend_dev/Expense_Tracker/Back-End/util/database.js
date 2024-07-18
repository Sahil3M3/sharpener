const Sequelize=require('sequelize')

const sequelize=new Sequelize('expenseFs','root','manager',{dialect:'mysql'});

module.exports=sequelize;
