const Sequelize=require('sequelize')

const sequelize=new Sequelize('review','root','manager',{dialect:'mysql'});

module.exports=sequelize;