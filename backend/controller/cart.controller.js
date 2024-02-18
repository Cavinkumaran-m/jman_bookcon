const express = require("express");
const router = express.Router();
const WishList = require("../models/wishlist");
const Product= require("../models/book");
const {Op}= require('sequelize')

// get all products
router.get("", async (req, res) => {
  try {
    const allproducts = await WishList.findAll();
    return res.status(200).send(allproducts);
  } catch (error) {
    return res.status(400).send(error);
  }
});

 
// get all products of single user by user id
router.get("/:userId", async (req, res) => {
  try {
    const allproducts = await Cart.findAll({
      where: { userId: req.params.userId },
    });
    return res.status(200).send(allproducts);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// delete  single product by itemid
router.delete("", async (req, res) => {
  try {
    const deletedItem = await Cart.destroy({
      where: {[Op.and]:[{cartId: req.body.cartId},{userId:req.body.userId}] },
    });
    if(deletedItem===1){
      const allproducts= await Cart.findAll({where:{userId:req.body.userId}});
      return res.status(200).send(allproducts)
    }
    return res.status(404).json({message:"No item found"});
  } catch (error) {
    return res.status(400).send(error);
  }
});

// delete quantity of all items of user's cart
router.delete("/allUserItem/:userId", async (req, res) => {
  try {
    const updatedItem = await Cart.destroy({
      where: { userId: req.params.userId },
    });
    return res.status(201).json(updatedItem);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;