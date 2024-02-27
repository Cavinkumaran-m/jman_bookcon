const express = require('express');
const path = require('path');
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Wishlist = require('../models/wishlist')
const { request } = require('http');

const app = express.Router();

app.use(cors());
app.use(express.json());


//view the wishlist
app.get('/wishlist',async(req,res)=>{
  try{
    const allWish = await Wishlist.findAll({where:{Customer_id:req.body.Customer_id}});
    //console.log(allWish);
    res.status(200).json({
        message : "ok",
        payload : allWish
    });
}
catch (err){
    res.status(400).json({
        message:err
    })
}
});

//insert into wishlist
app.post('/addwishlist',async(req,res)=>{
    try{
      const wishlistItem = await Wishlist.findOne({
        where: { Customer_id: req.body.Customer_id, Book_id: req.body.Book_id }
      });
      console.log("Existing  "+wishlistItem);
      if(!wishlistItem){
        const wishListData = {
            _id:crypto.randomUUID(),
            Book_id:req.body.Book_id,
            Customer_id:req.body.Customer_id,
            inCart:false,
            cartQuantity:0
        }
        const newWishList = Wishlist.create(wishListData);
        console.log(newWishList);
      }
        res.status(200).json({
            message :"Success"
        })
        }catch(err){
          console.log(err);
          res.status(400).json({
            message:err
          })
        }
});

//delete from wishlist
app.delete('/deletewishlist', async(req, res)=>{
  await Wishlist.destroy({
    where: {
       Book_id:req.body.Book_id , Customer_id:req.body.Customer_id 
    }
  }).then(function(){
    if(Wishlist){
        res.status(200).send("done")
    } else {
        res.status(400).send('Error in deleting record')
    }
})
  });

//change item from wishlist to cart
app.post('/addtocart',async(req,res)=>{
  try{
      const Book_id=req.body.Book_id;
      const Customer_id = req.body.Customer_id;
      const updateBook = await Wishlist.findOne({ where: { Book_id:Book_id , Customer_id:Customer_id } });
      const primaryKey = updateBook._id;
      const updateCart = {
        Book_id:Book_id,
        Customer_id:Customer_id,
        inCart:1,
        cartQuantity:1
    };  
    const result = await Wishlist.update(updateCart, {
        where: { _id: primaryKey } // Update the entry with the given id
    });  
    console.log(result);
        res.status(200).json({
            message :"Success"
        })
  }catch(err){
    res.status(400).json({
      message:err
    })
  }
});

module.exports = app;
