const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const Customer = sequelize.define('customer',{
    customer_id:{   
        type:Sequelize.INTEGER, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    },  
    username:{
         type: Sequelize.STRING, 
         allowNull:false 
    },
    email_id:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
},
{
    freezeTableName:true,
    timestamps:false
})
module.exports =Customer