const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const User = require('../models/user')
const Book = require('../models/book')
const Wishlist= sequelize.define('Wishlist',{
    _id:{   
        type:Sequelize.DATE, 
        allowNull:false, 
        primaryKey:true
    }, 
    Book_id:{
        type:Sequelize.STRING(36),
        references:{
            model: 'book',
            key: '_id',
        }
    },
    Customer_id:{
        type:Sequelize.STRING(36), 
        references: {
            model: 'customer', 
            key: '_id', 
         }
    },
},
{
    freezeTableName:true,
    timestamps:false
})

Book.hasMany(Wishlist)
User.hasMany(Wishlist)

module.exports = Wishlist