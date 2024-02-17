const express = require('express');
const sequelize = require('../../config/dbconfig');
const Books = require("../../models/book");
const Order_Details = require("../../models/orderDetail");
const Users = require("../../models/user")
const Orders = require("../../models/order")
const {message, status} = require("../../config/messages");

const book_router = express.Router();

const getBooks = async (req, res) => {
    try{
        const allBooks = await Books.findAll();
        console.log(allBooks);
        res.status(status.ok).json({
            message : message.ok,
            payload : allBooks
        });
    }
    catch (err){
        res.status(status.badRequest).json({
            message:message.error
        })
    }
}

const getSingleBook = async (req, res) => {
    try {
        const bookId = req.params.id;  
        const last10Orders = await Order_Details.findAll({
            where: { Book_id: bookId },
            order: [['createdAt', 'DESC']],
            limit: 10,
            include: [
            {
                model: Orders,
                attributes: ['Customer_id', 'Status'],
                include: [{ model: Users, attributes: ['username'] }]
            }
            ]
        });  
        const overallSoldCount = await Order_Details.sum('No_Of_Pieces', {
            where: { Book_id: bookId }
        });
        const overallSalesVolume = await Order_Details.sum('Cost', {
            where: { Book_id: bookId }
        });
        const formattedOrders = last10Orders.map(order => ({
            username: order.Order.Customer.username,
            numberOfPieces: order.No_Of_Pieces,
            price: order.Cost
        }));
    
        res.status(status.ok).json({
            message : message.ok,
            last10Orders: formattedOrders,
            overallSoldCount,
            overallSalesVolume
      });
    } 
    catch (error) {
        res.status(status.badRequest).json({
            message:message.error
        })
    }
}


const createBook = async (req, res) => {
    try{
        const bookData = {
            ISBN: response.body.ISBN,
            Name: response.body.Name,
            Cover_Image: response.body.Cover_Image,
            Selling_cost: response.body.Selling_cost,
            Available_pieces: response.body.Available_pieces,
            Author: response.body.Author,
            Publisher: response.body.Publisher,
            Year_of_Publication: response.body.Year_of_Publication,
            Purchase_Cost: response.body.Purchase_Cost
        };
        const newBook = await Book.create(bookData);   
        console.log(newBook);
        res.status(status.ok).json({
            message : message.ok
        })
    }
    catch (err){
        res.status(status.badRequest).send({
            message:message.error
        })
    }
}

const updateBook = async (req, res) => { 
    try {   
        const id = req.body.id; 
        const bookData = {
            ISBN: req.body.ISBN,
            Name: req.body.Name,
            Cover_Image: req.body.Cover_Image,
            Selling_cost: req.body.Selling_cost,
            Available_pieces: req.body.Available_pieces,
            Author: req.body.Author,
            Publisher: req.body.Publisher,
            Year_of_Publication: req.body.Year_of_Publication,
            Purchase_Cost: req.body.Purchase_Cost
        };  
        const result = await Books.update(bookData, {
            where: { _id: id } // Update the entry with the given id
        });     
        console.log(result);      
        const updatedBook = await Books.findByPk(id);      
        res.status(status.ok).send({
            message : message.ok,
            payload : updatedBook
        })
    } 
    catch (error) {      
        res.status(status.badRequest).json({
            message:message.error
        })
    }
}

book_router.patch('/update', updateBook);
book_router.post('/create', createBook);
book_router.get('/getBooks', getBooks);
book_router.get('/getBooks/:id',getSingleBook);

module.exports = book_router