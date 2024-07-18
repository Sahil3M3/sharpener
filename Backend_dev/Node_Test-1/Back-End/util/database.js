const Sequelize=require('sequelize')

const sequelize=new Sequelize('shop','root','manager',{dialect:"mysql"});

module.exports=sequelize;

