const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const Admin = sequelize.define('admin',{
    admin_id:{   
        type:Sequelize.INTEGER, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    },  
    username:{
         type: Sequelize.STRING, 
         allowNull:false 
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
module.exports =Admin