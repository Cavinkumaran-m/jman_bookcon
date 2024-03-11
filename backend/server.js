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
    origin: ["http://localhost:3000", "http://localhost:5173"], // Your frontend origin
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

// ======================
// MYSQL SESSION HANDLING
// ======================
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: "SESSION_DB",
  createDatabaseTable: true,
};
const sessionStore = new MySQLStore(options);
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 30,
    },
  })
);

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
