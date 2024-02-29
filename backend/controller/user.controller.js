const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt
const express = require('express');
const crypto = require('crypto')
const path = require('path');
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const User = require('../models/user')
const { request } = require('http');

const app = express.Router();
// app.use(cors());
app.use(express.json());


//insert user
app.post('/adduser',async(req,res)=>{
  try{
    const existingUser = await User.findOne({
      where: {
        Email: req.body.Email
      }
    });
    
    if (existingUser) {
      return res.status(409).json({ // 409 Conflict
        message: "User already exists"
      });
    }
    const hash = crypto
    .createHmac("sha256", process.env.PASSWORD_SECRET_KEY)
    .update(req.body.Password)
    .digest("hex")
    .substring(0, 15); 
    const UserData = {
      _id:crypto.randomUUID(),
        Username:req.body.Username,
        Email:req.body.Email,
        Password:hash,
        Date: moment().format('YYYY:MM:DD'),
        Role:req.body.Role,
  
    };
    const newUser = User.create(UserData);
    //console.log(newUser);
    res.status(200).json({
      message :"Success"
    })
  }
  catch (err){
    res.status(400).send({
        message:err
    })
}
});

//delete user
app.post('/deleteuser', async(req, res)=>{
    User.findByPk(_id=req.body.id).then(function(user){
      return user.destroy();
    }).then(function(){
        if(User){
            res.send("done")
        } else {
            res.status(400).send('Error in deleting record')
        }
    })
  });


  //display all users
app.post("/viewallusers", async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  
module.exports = app;