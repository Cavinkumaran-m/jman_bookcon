const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const User = sequelize.define('Users',{
    _id:{   
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),   
        allowNull:false, 
        primaryKey:true
    },  
    Username:{
         type: Sequelize.STRING, 
         allowNull:false 
    },
    Email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    Password:{
        type:Sequelize.STRING(45),
        allowNull:false,
        unique:true
    },
    Date:{
        type:Sequelize.DATE,
    },
    Role:{
        type:Sequelize.TINYINT(1)
    }
},
{
    freezeTableName:true,
    timestamps:false
})
module.exports =User;