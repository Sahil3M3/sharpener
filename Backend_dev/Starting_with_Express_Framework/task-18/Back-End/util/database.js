const Sequelize=require('sequelize');

const sequelize=new Sequelize('booking','root','manager',{dialect:'mysql'});

module.exports=sequelize;