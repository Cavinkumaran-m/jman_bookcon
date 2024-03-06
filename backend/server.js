require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
const customerRoutes = require("./routes/customerRoutes");
const authenticateToken = require("./middleware/authMiddleware");
const userRoutes = require("./controller/user.controller");
const sequelize = require("./config/dbconfig");
const adminBooks_router = require("./routes/admin/books_routers");
const adminStats_router = require("./routes/admin/stats_router");
const adminUser_router = require("./routes/admin/user_router");
const order_router = require("./routes/admin/order_routers");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
app.use(
  cors({
    origin: "*", // Your frontend origin
    credentials: true, // To allow cookies and authentication data
  })
);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables have been created");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });
app.use(bodyParser.json());

//admin routers
app.use("/admin/books", adminBooks_router);
app.use("/admin/stats", adminStats_router);
app.use("/admin/users", adminUser_router);
app.use("/admin/orders/", order_router);

// Customer-end route
app.use("/api", customerRoutes);

// Public route
app.use("/api", authRoutes);
//CRUD USER Route
app.use("/api/user", userRoutes);
// Protected route
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "You're authorized to access this route" });
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
