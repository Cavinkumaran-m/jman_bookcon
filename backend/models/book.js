const Sequelize = require("sequelize");
const sequelize = require("../config/dbconfig");
const Book = sequelize.define(
  "Books",
  {
    _id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
      primaryKey: true,
      allowNull: false,
    },
    ISBN: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: true,
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Cover_Image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Selling_cost: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    Available_pieces: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    Author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Publisher: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Year_of_Publication: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    Purchase_Cost: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    Genre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Book;
