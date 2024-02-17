const express = require('express');
const sequelize = require('../../config/dbconfig');
const Stats = require("../../models/stat")
const Sequelize = require("sequelize");
const User = require("../../models/user")
const {message, status} = require("../../config/messages")

const stats_router = express.Router();

const get_all_stats = async (req, res) => {
    try{
        const presentDate = new Date();
        const priorDate = new Date(presentDate.setDate(presentDate.getDate() - 7));
        const startDate = new Date(req.query.start || priorDate.getDate()); // Create new Date object from priorDate.getTime()
        const endDate = new Date(req.query.end || presentDate);
        //console.log("Start Date",startDate);
        //console.log("End Date",endDate);
        const data = await Stats.findAll({
            where: {
              Date: {
                [Sequelize.Op.between]: [startDate, endDate]
              }
            }
        });
        //console.log(data)
        res.status(status.ok).send({ 
            message:message.ok, 
            payload:data
        })
    }
    catch(error){
        console.log(error);
        res.status(status.badRequest).send({
            message:message.error,
            payload: error
        })
    }
}

stats_router.get("/", get_all_stats);

module.exports = stats_router;