const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByUsername } = require("../models/customer");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);

  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate a token
    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken: token });
  } else {
    res.send("Username or password is incorrect");
  }
});

module.exports = router;
