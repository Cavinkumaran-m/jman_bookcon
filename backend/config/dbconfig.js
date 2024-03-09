//cloud
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "BOOK_STORE_DB",
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

//Localhost
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("bookdb", "root", "123456", {
//   host: "localhost",
//   port: "3306",
//   dialect: "mysql",
// });

module.exports = sequelize;
