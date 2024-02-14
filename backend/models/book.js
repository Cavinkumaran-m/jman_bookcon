const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const Book = sequelize.define('Books',{
    _id:{   
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey:true,
        allowNull:false, 
    },  
    ISBN:{
         type: Sequelize.STRING(20),
         unique:true, 
         allowNull:true 
    },
    Name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    Cover_Image:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Selling_cost:{
        type:Sequelize.DECIMAL(10,2),
        allowNull:true
    },
    Available_pieces:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    Author:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Publisher:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Year_of_Publication:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    Purchase_Cost:{
        type:Sequelize.DECIMAL(10,2),
        allowNull:true
    }
},
{
    freezeTableName:true,
    timestamps:false
})
module.exports =Book