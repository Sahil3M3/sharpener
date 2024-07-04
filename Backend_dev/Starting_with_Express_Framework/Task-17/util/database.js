const Sequelize=require('sequelize')

const sequelize=new Sequelize('node-complete','root','manager',{dialect:'mysql',host:'localhost'});

module.exports=sequelize;