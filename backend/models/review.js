const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const User = require('../models/user')
const Book = require('../models/book')
const Review= sequelize.define('Review',{
    _id:{   
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull:false, 
        primaryKey:true
    }, 
    Book_id:{
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        references:{
            model: 'Books',
            key: '_id',
        }
    },
    Customer_id:{
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        references: {
            model: 'Users', 
            key: '_id', 
         }
    },
    Rating:{
        type:Sequelize.DECIMAL(10,0),
        allowNull:true
    },
    Comment:{
        type:Sequelize.STRING,
        allowNull:true
    }
},
{
    freezeTableName:true,
    timestamps:false
})
Book.hasMany(Review)
User.hasMany(Review)

module.exports = Review