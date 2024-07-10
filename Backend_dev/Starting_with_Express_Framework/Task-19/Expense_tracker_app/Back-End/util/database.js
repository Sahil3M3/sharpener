const Sequelize=require('sequelize');

const sequelize=new Sequelize('expense','root','manager',{dialect:'mysql'});

module.exports=sequelize;