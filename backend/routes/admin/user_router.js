const express = require('express');
const sequelize = require('../../config/dbconfig');
const Books = require("../../models/book");
const Order_Details = require("../../models/orderDetail");
const Users = require("../../models/user")
const Orders = require("../../models/order")
const {message, status} = require("../../config/messages");

const user_router = express.Router();

const getUsers = async (req, res) => {
    try{
        const allUsers = await Users.findAll({
            attributes: { exclude: ['Password'] }
        });
        res.status(status.ok).json({
            message : message.ok,
            payload : allUsers
        });
    }
    catch (error){
        res.status(status.badRequest).json({
            message:message.error,
            payload: error
        });
    }
}

const getSingleUser = async (req, res) => {
    try{
        const userId = req.params.id;         

        const last10OrderDetails = await Order_Details.findAll({
            include: [
                {
                    model: Orders,
                    where: { Customer_Id: userId },
                    order: [['Date', 'DESC']]                    
                },
                { model: Books, attributes: ['Name'] }
            ],
            limit: 10
        });//need to write sql code directly for it

        console.log('hi')

        // Format the response
        const formattedOrderDetails = last10OrderDetails.map(orderDetail => ({
        bookName: orderDetail.Book.Name,
        numberOfPieces: orderDetail.No_Of_Pieces,
        orderId: orderDetail.Order_Id,
        address: {
            street: orderDetail.Order.Street,
            city: orderDetail.Order.City,
            state: orderDetail.Order.State,
            country: orderDetail.Order.Country,
            pincode: orderDetail.Order.Pincode
        },
        cost: orderDetail.Cost
        }));

        const overallBookCount = await Order_Details.sum('No_Of_Pieces', {
            include: [{
              model: Orders,
              where: { Customer_id: userId }
            }]
        });
      
        const totalSpent = await Orders.sum('Cost', {
            where: { Customer_id: userId }
        });

        res.status(status.ok).json({
            message: message.ok,
            last10Orders: formattedOrderDetails,
            overallBookCount,
            totalSpent
        });
    }
    catch (error){
        console.log(error)
        res.status(status.badRequest).json({
            message:message.error,
            payload: error
        });
    }

}

user_router.get('/getUsers', getUsers);
user_router.get('/getUsers/:id', getSingleUser);

module.exports = user_router;