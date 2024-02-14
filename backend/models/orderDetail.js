const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const Order = require('../models/order')
const Book = require('../models/book')
const OrderDetail = sequelize.define('Order_Details',{
    _id:{   
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'), 
        allowNull:false, 
        primaryKey:true
    }, 
    Order_id:{
        type:Sequelize.STRING(36),
        references:{
            model: 'order',
            key: '_id',
        }
    },
    Book_id:{
        type:Sequelize.STRING(36), 
        allowNull:false, 
        references: {
            model: 'book', 
            key: '_id', 
         }
    },
    No_Of_Pieces:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    Cost:{
        type:Sequelize.INTEGER,
        allowNull:true
    }
},
{
    freezeTableName:true,
    timestamps:false
})
Book.hasMany(OrderDetail)

module.exports = OrderDetail