require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
const customerRoutes = require("./routes/customerRoutes");
const authenticateToken = require("./middleware/authMiddleware");
const sequelize = require("./config/dbconfig");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend origin
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

// Customer-end route
app.use("/api", customerRoutes);

// Public route
app.use("/api", authRoutes);

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
