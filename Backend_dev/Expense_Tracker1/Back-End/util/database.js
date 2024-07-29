const Sequelize=require('sequelize')

const sequelize=new Sequelize('expenses','root','manager',{dialect:'mysql'});

module.exports=sequelize;
