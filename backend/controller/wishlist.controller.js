const express = require('express');
const crypto = require('crypto')
const path = require('path');
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Wishlist = require('../models/wishlist')
const { request } = require('http');

//const app = express.Router();
const app = express();
app.use(cors());
app.use(express.json());


//insert into wishlist
app.post('/addwishlist',async(req,res)=>{
    try{
        const wishListData = {
            _id:crypto.randomUUID(),
            Book_id:req.body.Book_id,
            Customer_id:req.body.Customer_id,
            inCart:0
        }
        const newWishList = Wishlist.create(wishListData);
        console.log(newWishList);
        res.status(200).json({
            message :"Success"
        })
        }catch(err){
          res.status(400).json({
            message:err
          })
        }
});

//delete from wishlist
app.post('/deletewishlist', async(req, res)=>{
    Wishlist.findByPk(_id=req.body.id).then(function(Wishlist){
      return Wishlist.destroy();
    }).then(function(){
        if(Wishlist){
            res.send("done")
        } else {
            res.status(400).send('Error in deleting record')
        }
    })
  });

///module.exports = app;
app.listen(8080 , ()=>{
    console.log(`app running on port 8080`);
})