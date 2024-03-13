const express = require("express");
const Books = require("../models/book");
const { Op, INTEGER } = require("sequelize");
const sequelize = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Wishlist = require("../models/wishlist");
const Order = require("../models/order");
const OrderDetails = require("../models/orderDetail");
const moment = require("moment");

// =====================================
// API Endpoints related to customer-end
// =====================================

// ============================
// Cavinkumaran's API Endpoints
// ============================

// login without credentials
// router.post("/login", async (req, res) => {
//   res.json({ accessToken: "damaal_dumeel", role: "god" });
// });

// Session verification middleware
const Sessionverifier = (req, res, next) => {
  try {
    if (!req.session.isAuth) {
      res.status(440).json({ status: "error", error: "session_expired" });
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
};

//search
router.post("/books", async (req, res) => {
  console.log(req.body);

  // Genre
  const AvailGenres = [
    "Fiction",
    "Mystery",
    "Fantasy",
    "Romance",
    "Science Fiction",
    "Horror",
  ];
  var genre = [];
  for (var i = 0; i < 6; i++) {
    if (req.body.genre[i] == true) {
      genre.push(AvailGenres[i]);
    }
  }

  // Order
  var sort = req.body.sort;
  var orderQuery;
  if (sort === "Name") {
    orderQuery = ["Name"];
  } else if (sort === "Latest") {
    orderQuery = ["Year_of_Publication", "DESC"];
  } else if (sort === "Old") {
    orderQuery = ["Year_of_Publication"];
  } else if (sort === "lowestPrice") {
    orderQuery = ["Selling_cost"];
  } else if (sort === "highestPrice") {
    orderQuery = ["Selling_cost", "DESC"];
  } else if (sort === "userReview") {
    orderQuery = ["Rating", "DESC"];
  }

  const response = await Books.findAll({
    attributes: [
      "_id",
      "Author",
      "Cover_Image",
      "Genre",
      "Name",
      "ISBN",
      "Rating",
      "Selling_cost",
      "Year_of_Publication",
      "RatingCount",
    ],
    where: {
      Genre: { [Op.or]: genre },
      Rating: {
        [Op.and]: [
          { [Op.gte]: req.body.rating[0] },
          { [Op.lte]: req.body.rating[1] },
        ],
      },
      Selling_cost: {
        [Op.and]: [
          { [Op.gte]: req.body.price[0] },
          { [Op.lte]: req.body.price[1] },
        ],
      },
      [Op.or]: [
        {
          Author: {
            [Op.substring]: req.body.query,
          },
        },
        {
          Name: {
            [Op.substring]: req.body.query,
          },
        },
      ],
    },
    order: [orderQuery],
  });
  res.json({ status: "success", payload: response });
});

//Wishlist
router.post("/wishlist", Sessionverifier, async (req, res) => {
  if (req.body.type === "getWishlist") {
    try {
      const allWish = await Wishlist.findAll({
        where: { Customer_id: req.body.Customer_id, inCart: false },
      });
      // console.log(allWish);
      const res_data = await Promise.all(
        allWish.map(async (wish) => {
          {
            return {
              book_details: await Books.findOne({
                attributes: [
                  "_id",
                  "Author",
                  "Cover_Image",
                  "Genre",
                  "Name",
                  "ISBN",
                  "Rating",
                  "Selling_cost",
                  "Year_of_Publication",
                ],
                where: {
                  _id: wish["Book_id"],
                },
              }),
            };
          }
        })
      );
      // console.log(res_data);
      res.status(200).json({
        status: "success",
        payload: res_data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "error",
        error: err,
      });
    }
  } else if (req.body.type === "addWishlist") {
    // console.log(req.body);
    // res.json({ status: "success" });
    // return;
    try {
      const wishlistItem = await Wishlist.findOne({
        where: { Customer_id: req.body.Customer_id, Book_id: req.body.Book_id },
      });
      if (!wishlistItem) {
        const wishListData = {
          _id: crypto.randomUUID(),
          Book_id: req.body.Book_id,
          Customer_id: req.body.Customer_id,
          inCart: false,
          cartQuantity: 0,
        };
        const newWishList = Wishlist.create(wishListData);
        //console.log(newWishList);
      }
      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "error",
        error: err,
      });
    }
  } else if (req.body.type === "removeWishlist") {
    // console.log(req.body);
    // return res.json({ status: "success" });
    await Wishlist.destroy({
      where: {
        Book_id: req.body.Book_id,
        Customer_id: req.body.Customer_id,
      },
    }).then(function () {
      if (Wishlist) {
        // console.log(Wishlist);
        res.status(200).json({ status: "success" });
      } else {
        res.status(400).json({ status: "error" });
      }
    });
  }
});

// Cart
router.post("/cart", Sessionverifier, async (req, res) => {
  if (req.body.type === "addToCart") {
    try {
      const Customer_id = req.body.Customer_id;
      const Book_id = req.body.Book_id;
      var checkVar = 0;

      // Check if the book is already in the wishlist
      const wishlistItem = await Wishlist.findOne({
        where: { Customer_id: Customer_id, Book_id: Book_id },
      });
      const selectBook = await Books.findByPk(Book_id);

      if (selectBook.Available_pieces > 0 && selectBook.Deleted == 0) {
        if (!wishlistItem) {
          // If the book is not in the wishlist, create a new wishlist item
          await Wishlist.create({
            Customer_id: Customer_id,
            Book_id: Book_id,
            inCart: true,
            cartQuantity: 1,
          });
        } else {
          // If the book is already in the wishlist, update the quantity and set inCart to true
          if (wishlistItem.cartQuantity < selectBook.Available_pieces) {
            wishlistItem.cartQuantity =
              wishlistItem.cartQuantity === 0
                ? 1
                : wishlistItem.cartQuantity + 1;
            // console.log(wishlistItem.cartQuantity);
            wishlistItem.inCart = true;
            await wishlistItem.save();
          } else {
            checkVar = 1;
            res.status(200).json({ status: "empty" });
          }
        }
        if (checkVar == 0) res.status(200).json({ status: "success" });
      } else {
        res.status(200).json({ status: "empty" });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ status: "error", error: error });
    }
  } else if (req.body.type === "getCart") {
    try {
      const allWish = await Wishlist.findAll({
        where: { Customer_id: req.body.Customer_id, inCart: true },
      });
      // console.log(allWish);
      const res_data = await Promise.all(
        allWish.map(async (wish) => {
          {
            return {
              quantity: wish["cartQuantity"],
              book_details: await Books.findOne({
                attributes: [
                  "_id",
                  "Author",
                  "Cover_Image",
                  "Genre",
                  "Name",
                  "ISBN",
                  "Rating",
                  "Selling_cost",
                  "Available_pieces",
                  "Year_of_Publication",
                ],
                where: {
                  _id: wish["Book_id"],
                },
              }),
            };
          }
        })
      );
      // console.log(res_data);
      res.status(200).json({
        status: "success",
        payload: res_data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "error",
        error: err,
      });
    }
  } else if (req.body.type === "removeFromCart") {
    try {
      const Customer_id = req.body.Customer_id;
      const Book_id = req.body.Book_id;

      const cartItem = await Wishlist.findOne({
        where: { Customer_id: Customer_id, Book_id: Book_id },
      });

      if (cartItem) {
        cartItem.inCart = false;
        cartItem.cartQuantity = 0;
        await cartItem.save();
      }

      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ status: "error", error: error });
    }
  } else if (req.body.type === "updateCartQuantity") {
    try {
      const Customer_id = req.body.Customer_id;
      const Book_id = req.body.Book_id;
      const varcartQuantity = req.body.quantity;
      const cartItem = await Wishlist.findOne({
        where: { Customer_id: Customer_id, Book_id: Book_id },
      });

      if (cartItem) {
        if (varcartQuantity != 0) {
          cartItem.cartQuantity = varcartQuantity;
        } else {
          cartItem.inCart = false;
          cartItem.cartQuantity = 0;
        }
        await cartItem.save();
      }

      res.status(200).json({ status: "success" });
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      res.status(500).json({ status: "error", error: error });
    }
  } else if (req.body.type == "checkCart") {
    try {
      const varCustomer_id = req.body.Customer_id;
      const cartItems = await Wishlist.findAll({
        where: { Customer_id: varCustomer_id, inCart: 1 },
      });
      var checkDelete = 0;
      for (let i = 0; i < cartItems.length; i++) {
        // const currentOrderedBook = cartItems[i];
        const BookDetails = await Books.findByPk(cartItems[i].Book_id);
        if (BookDetails.Deleted == 1) {
          checkDelete = 1;
          res.status(200).json({
            status: "Deleted",
            message: "Currently unavailable - " + BookDetails.Name,
          });
          break;
        }
      }
      if (checkDelete == 0) {
        res.status(200).json({ status: "success" });
      }
    } catch (error) {
      console.error("Error in checking cart items", error);
      res.status(500).json({ status: "error", error: error });
    }
  }
});

router.post("/checkout", Sessionverifier, async (req, res) => {
  try {
    const Customer_id = req.body.Customer_id;
    const varStreet = req.body.Street;
    const varCity = req.body.City;
    const varState = req.body.State;
    const varCountry = req.body.Country;
    const varPincode = req.body.Pincode;
    const varCost = req.body.Cost;

    const cartItems = await Wishlist.findAll({
      where: { Customer_id: Customer_id, inCart: 1 },
    });

    // Creating one order
    const currentOrder = await Order.create({
      _id: crypto.randomUUID(),
      Customer_id: Customer_id,
      Street: varStreet,
      City: varCity,
      State: varState,
      Country: varCountry,
      Pincode: varPincode,
      Cost: varCost,
      Date: moment().format("YYYY:MM:DD"),
      Status: "processed",
      Cart: 0,
    });

    //To add each book into order details
    for (let i = 0; i < cartItems.length; i++) {
      const currentOrderedBook = cartItems[i];
      const BookPrice = await Books.findByPk(currentOrderedBook.Book_id);
      const OrderDetailData = {
        Order_id: currentOrder._id,
        Book_id: currentOrderedBook.Book_id,
        No_Of_Pieces: currentOrderedBook.cartQuantity,
        Cost: BookPrice.Selling_cost,
      };
      const newOrderDetail = OrderDetails.create(OrderDetailData);

      // To update the stock of a product
      if (BookPrice) {
        BookPrice.Available_pieces -= currentOrderedBook.cartQuantity;
        await BookPrice.save();
      }

      // To delete book from cart
      const deleteFromCart = await Wishlist.findOne({
        where: {
          Customer_id: Customer_id,
          Book_id: currentOrderedBook.Book_id,
        },
      });
      if (deleteFromCart) {
        deleteFromCart.inCart = false;
        deleteFromCart.cartQuantity = 0;
        await deleteFromCart.save();
      }
    }

    res.status(200).json({
      status: "success",
      message: "ok",
    });
  } catch (error) {
    console.error("Error in checking out", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rating
router.post("/rating", Sessionverifier, async (req, res) => {
  if (req.body.type === "addRating") {
    const RatingItem = await Books.findOne({
      where: { _id: req.body.Book_id },
    });
    const oldRating = parseFloat(RatingItem["Rating"]);
    const RatingCount = parseFloat(RatingItem["RatingCount"]);
    const newRating =
      (oldRating * RatingCount + parseFloat(req.body.rating)) /
      (RatingCount + 1);
    RatingItem.Rating = Math.round(newRating * 100) / 100;
    RatingItem.RatingCount = RatingItem.RatingCount + 1;
    // console.log(newRating);
    await RatingItem.save();
    res.json({ status: "success" });
  }
});

// Order History
router.post("/orderHistory", Sessionverifier, async (req, res) => {
  if (req.body.type === "getOrderHistory") {
    try {
      const customer_id = req.body.Customer_id;
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
      const orderDetails = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { customer_id },
      });
      const groupedOrderDetails = orderDetails.reduce((acc, curr) => {
        const {
          _id,
          Customer_Name,
          Status,
          Date,
          Book_Id,
          Book_Name,
          No_Of_Pieces,
          Cost,
          Total_Cost,
          Street,
          City,
          State,
          Country,
          Pincode,
        } = curr;
        if (!acc[_id]) {
          acc[_id] = {
            _id,
            Customer_Name,
            Status,
            Date,
            Order_Details: [],
            Total_Cost,
          };
        }
        acc[_id].Order_Details.push({ Book_Name, No_Of_Pieces, Cost });
        return acc;
      }, {});

      // Convert groupedOrderDetails object to an array of order objects
      const result = Object.values(groupedOrderDetails);
      console.log(result);
      res.json({
        status: "success",
        payload: result,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        error: error,
      });
    }
  }
});
module.exports = router;
