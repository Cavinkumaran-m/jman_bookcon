const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')

const Customer = require('../models/customer')  
const Admin = require('../models/admin')
const Book = require('../models/book')
const Order = require('../models/order')
const OrderDetail = require('../models/orderDetail')

sequelize.sync({alter:true})   
