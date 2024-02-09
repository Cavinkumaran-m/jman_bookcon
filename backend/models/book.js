const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const Book = sequelize.define('book',{
    book_id:{   
        type:Sequelize.INTEGER, 
        autoIncrement:true, 
        primaryKey:true,
        allowNull:false, 
    },  
    isbn:{
         type: Sequelize.INTEGER,
         unique:true, 
         allowNull:false 
    },
    book_name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    cost:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    no_of_pieces:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    available:{
        type:Sequelize.INTEGER,
    },
    author:{
        type:Sequelize.STRING,
        allowNull:false
    },
    publisher:{
        type:Sequelize.STRING,
        allowNull:false
    }
},
{
    freezeTableName:true,
    timestamps:false
})
module.exports =Book