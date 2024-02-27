const express = require('express');
const path = require('path');
const crypto = require('crypto')
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Book = require("../models/book");
const Wishlist = require('../models/wishlist');
const Order = require('../models/order');
const OrderDetails = require('../models/orderDetail');
const { request } = require('http');

//const app = express.Router();
app = express();

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
    //console.log(cartItem);
    res.status(200).json({
        message : "ok",
        payload : cartItem
    });
  }
  catch (error) {
    console.error('Error deleting from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Checkout Process - Monisha 
app.post('/checkout',async(req,res)=>{
  try{
      const Customer_id = req.body.Customer_id;
      const cartItems = await Wishlist.findAll({where:{Customer_id:Customer_id,inCart:1}});

      //NEED TO IMPLEMENT STORING THE ADDRESS AND THE COST
      const currentOrder = await Order.create({
        _id:crypto.randomUUID(),
        Customer_id: Customer_id,
        Pincode:111111,
        Date:moment().format('YYYY:MM:DD'),
        Status:"processed"
      });

      for (let i = 0; i < cartItems.length; i++) {
        const currentOrderedBook = cartItems[i];
        const BookPrice = await Book.findByPk(currentOrderedBook.Book_id);
        const OrderDetailData = {
          Order_id:currentOrder._id,
          Book_id:currentOrderedBook.Book_id,
          No_Of_Pieces:currentOrderedBook.cartQuantity,
          Cost:BookPrice.Selling_cost,
        }  
        const newOrderDetail = OrderDetails.create(OrderDetailData); 
      }
      
      res.status(200).json({
        message : "ok",
    });
  }
  catch(error){
    console.error('Error in checking out',error);
    res.status(500).json({error:'Internal Server Error'})
  }
});
//module.exports = app;

app.listen(8080, () => {
  console.log(`Server is running on port 8080}`);
});