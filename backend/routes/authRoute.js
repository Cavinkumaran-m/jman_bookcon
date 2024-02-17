const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

// ----------------------------------------------------
// These files are missing Riya... so im commenting it out...
// ----------------------------------------------------
const User = require("../models/user");

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sonadas.8april@gmail.com",
    pass: "ckmb slja tdpq qvtq",
  },
});
// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, "username isnide login route");
  let user = await User.findOne({ where: { username } });
  let role = user.role;

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { userId: user.id, role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    res.json({ accessToken: token, role: role });
  } else {
    res.status(401).json({ message: "Username or password is incorrect" });
  }
});

async function userExists(username) {
  let user = await User.findOne({ where: { username } });
  if (user) return { exists: true, type: user.role, user };

  return { exists: false };
}

// Function to generate OTP
function generateOTP(username) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6 digit OTP
  const ttl = 15 * 60 * 1000; // 15 minutes in milliseconds
  const expires = Date.now() + ttl;
  const data = `${username}.${otp}.${expires}`;
  const hash = crypto
    .createHmac("sha256", process.env.OTP_SECRET_KEY)
    .update(data)
    .digest("hex");
  const fullHash = `${hash}.${expires}`;

  return { otp, fullHash };
}

// Endpoint to request OTP
router.post("/request-otp", async (req, res) => {
  const { username } = req.body;
  const userResult = await userExists(username);
  if (!userResult.exists) {
    return res.status(400).send("User does not exist");
  }

  const { otp, fullHash } = generateOTP(username);

  await userResult.user.update({
    otp: fullHash, // Store the hashed OTP
    otpExpires: new Date(Date.now() + 15 * 60 * 1000), // Set expiration 15 mins ahead
  });
  const mailOptions = {
    from: "sonadas.8april@gmail.com",
    to: username,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      return res.status(500).send("Error sending OTP");
    }
    res.send("OTP sent successfully");
  });
});

router.post("/verify-otp", async (req, res) => {
  const { username, otp } = req.body;
  const userResult = await userExists(username);
  if (!userResult.exists) {
    return res.status(400).send("User does not exist");
  }

  const user = userResult.user;
  if (!user.otp || new Date() > user.otpExpires) {
    return res.status(400).send("OTP expired or not found");
  }

  const data = `${username}.${otp}.${user.otpExpires.getTime()}`;
  const newCalculatedHash = crypto
    .createHmac("sha256", process.env.OTP_SECRET_KEY)
    .update(data)
    .digest("hex");
  const [hashValue] = user.otp.split(".");

  if (newCalculatedHash === hashValue) {
    res.send("OTP verified successfully");

    await user.update({ otp: null, otpExpires: null });
  } else {
    res.status(400).send("Invalid OTP");
  }
});
router.post("/adduser", async (req, res) => {
  return await User.create({
    _id: crypto.randomUUID(),
    Username: req.body.Username,
    Email: req.body.Email,
    Password: req.body.Password,
    Date: moment().format("YYYY:MM:DD"),
    Role: req.body.Role,
  }).then(function (User) {
    if (User) {
      res.send(User);
    } else {
      res.status(400).send("Error in inserting new record");
    }
  });
});

module.exports = router;
