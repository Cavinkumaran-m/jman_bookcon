const express = require("express");
const Books = require("../models/book");
const { Op } = require("sequelize");
const sequelize = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Wishlist = require("../models/wishlist");

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

// JWT verification middleware
const JWTverifier = (req, res, next) => {
  try {
    var decoded = jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Invalid JWT" });
  }
};

//search
router.post("/books", async (req, res) => {
  // console.log(req.body);

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
      Genre: { [Op.or]: genre },
      Rating: { [Op.gte]: req.body.rating },
      Selling_cost: { [Op.lte]: req.body.price },
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
router.post("/wishlist", JWTverifier, async (req, res) => {
  try {
    const allWish = await Wishlist.findAll({
      where: { Customer_id: req.body.Customer_id },
    });
    const res_data = await Promise.all(
      allWish.map(async (wish) => {
        {
          return {
            book_details: await Books.findOne({
              attributes: [
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
            inCart: wish["inCart"],
            cartQuantity: wish["cartQuantity"],
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
});

module.exports = router;
