const express = require('express');
const crypto = require('crypto')
const path = require('path');
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Order = require('../models/order')
const { request } = require('http');

const app = express.Router();
app.use(cors());
app.use(express.json());




//insert order
app.post('/addorder',async(req,res)=>{
  try{
    const OrderData = {
      _id:crypto.randomUUID(),
      Customer_id:req.body.Customer_id,
      Cost:req.body.Cost,
      Street:req.body.Street,
      City: req.body.City,
      State:req.body.State,
      Country:req.body.Country,
      Pincode:req.body.Pincode,
      Date:moment().format('YYYY:MM:DD'),
      Status:req.body.Status,
      Cart:req.body.Cart
    };
    const newOrder = Order.create(OrderData);
    //console.log(newOrder);
    res.status(200).json({
      message :"Success"
    })
  }catch(err){
    console.log(err);
    res.status(400).send({
      message:err
  })
  }
});

//delete order
app.post('/deleteorder', async(req, res)=>{
    Order.findByPk(_id=req.body.id).then(function(order){
      return order.destroy();
    }).then(function(){
        if(Order){
            res.send("done")
        } else {
            res.status(400).send('Error in deleting record')
        }
    })
  });

//display all orders
app.post("/viewallorder", async (req, res) => {
    try {
      const orders = await Order.findAll();
      return res.status(200).send(orders);
    } catch (error) {
      return res.status(400).send(error);
    }
  });

module.exports = app;

app.post("/customerallorders", async (req, res) => {
  try{
    const customer_id = req.body.id;
      const query = `
          SELECT 
              o._id,
              u.UserName AS Customer_Name,
              o.Status,
              o.Date,
              od.Book_Id,
              b.Name AS Book_Name,
              od.No_Of_Pieces,
              od.Cost,
              o.Cost AS Total_Cost,
              o.Street,
              o.City,
              o.State,
              o.Country,
              o.Pincode
          FROM Orders o
          INNER JOIN Order_Details od ON o._id = od.Order_Id
          INNER JOIN Books b ON od.Book_Id = b._id
          INNER JOIN Users u ON o.Customer_Id = u._id
          WHERE o.Customer_Id=:customer_id
          ORDER BY o.Date;
      `;
      const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT, replacements: { customer_id } });
      const groupedOrderDetails = orderDetails.reduce((acc, curr) => {
          const { _id, Customer_Name, Status, Date, Book_Id, Book_Name, No_Of_Pieces, Cost, Total_Cost, Street, City, State, Country, Pincode } = curr;
          if (!acc[_id]) {
              acc[_id] = { _id, Customer_Name, Status, Date, Order_Details: [], Total_Cost };
          }
          acc[_id].Order_Details.push({ Book_Name, No_Of_Pieces, Cost });
          return acc;
      }, {});

      // Convert groupedOrderDetails object to an array of order objects
      const result = Object.values(groupedOrderDetails);
      res.status(status.ok).send({
          message: message.ok,
          payload: result
      });
  }
  catch (error){
    console.log(error)
    res.status(status.badRequest).json({
        message:message.error,
        payload: error
    });
});
