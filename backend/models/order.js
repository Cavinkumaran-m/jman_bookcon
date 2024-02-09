const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const Customer = require('../models/customer')  
const Order = sequelize.define('order',{
    order_id:{   
        type:Sequelize.INTEGER, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    },  
    customer_id:{
         type: Sequelize.INTEGER, 
         allowNull:false,
         references: {
            model: 'customer', 
            key: 'customer_id', 
         }
    },
    cost:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    address:{
        type:Sequelize.STRING,
        allowNull:false
    },
    date:{
        type:Sequelize.DATE,
        allowNull:false
    },
    delivered:{
        type:Sequelize.DATE,
        allowNull:false
    },
},
{
    freezeTableName:true,
    timestamps:false
})

Customer.hasMany(Order)
module.exports = Order