const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const Order = require('../models/order')
const Book = require('../models/book')
const OrderDetail = sequelize.define('orderDetail',{
    orderDetail_id:{   
        type:Sequelize.INTEGER, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    }, 
    order_id:{
        type:Sequelize.INTEGER,
        references:{
            model: 'order',
            key: 'order_id',
        }
    },
    book_id:{
        type:Sequelize.INTEGER, 
        allowNull:false, 
        references: {
            model: 'book', 
            key: 'book_id', 
         }
    },
    no_of_Pieces:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    cost:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
},
{
    freezeTableName:true,
    timestamps:false
})
Book.hasMany(OrderDetail)

module.exports = OrderDetail