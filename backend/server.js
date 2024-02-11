require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
const authenticateToken = require("./middleware/authMiddleware");
const sequelize = require("./config/dbconfig");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

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
