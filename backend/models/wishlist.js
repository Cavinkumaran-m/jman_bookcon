const Sequelize = require("sequelize");
const sequelize = require("../config/dbconfig");
const User = require("../models/user");
const Book = require("../models/book");
const Wishlist = sequelize.define(
  "Wishlist",
  {
    _id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    Book_Id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
      references: {
        model: "Books",
        key: "_id",
      },
    },
    Customer_id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
      references: {
        model: "Users",
        key: "_id",
      },
    },
    inCart: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cartQuantity: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Book.hasMany(Wishlist);
Wishlist.belongsTo(Book);
User.hasMany(Wishlist);
Wishlist.belongsTo(User);

module.exports = Wishlist;
