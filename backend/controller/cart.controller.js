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

const app = express.Router();
app.use(cors());
app.use(express.json());

app.post('/api/cart/add', async (req, res) => {
  try {
    const Customer_id = req.body.Customer_id;
    const Book_id = req.body.Book_id;
    const cartQuantity = req.body.cartQuantity;

    // Check if the book is already in the wishlist
    const wishlistItem = await Wishlist.findOne({
      where: { Customer_id: Customer_id, Book_id: Book_id }
    });

    if (!wishlistItem) {
      // If the book is not in the wishlist, create a new wishlist item
      await Wishlist.create({
        Customer_id: Customer_id,
        Book_id: Book_id,
        inCart: true,
        cartQuantity: cartQuantity
      });
    } else {
      // If the book is already in the wishlist, update the quantity and set inCart to true
      wishlistItem.cartQuantity = cartQuantity;
      wishlistItem.inCart = true;
      await wishlistItem.save();
    }

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cart/delete', async (req, res) => {
  try {
    const Customer_id = req.body.Customer_id;
    const Book_id = req.body.Book_id;
    const wishlistItem = await Wishlist.findOne({
      where: { Customer_id: Customer_id, Book_id: Book_id }
    });

    if (wishlistItem) {
            wishlistItem.inCart = false;
            wishlistItem.cartQuantity =0;
      await wishlistItem.save();
    }

    res.status(200).json({ message: 'Item deleted from cart successfully' });
  } catch (error) {
    console.error('Error deleting from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// View user's cart  - Monisha 
app.get('/viewcart',async(req,res)=>{
  try{
    const cartItem = await Wishlist.findAll({where:{Customer_id:req.body.Customer_id,inCart:1}});
    //console.log(allWish);
    res.status(200).json({
        message : "ok",
        payload : cartItem
    });
}catch (error) {
  console.error('Error deleting from cart:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});



module.exports = app;
