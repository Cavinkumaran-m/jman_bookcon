const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

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
  const { email, password } = req.body;
  let user = await User.findOne({ where: { email } });
  // if (user && (await bcrypt.compare(password, user.password))) {
  console.log(user);
  if (user && password === user.Password) {
    const payload = {
      userId: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: token, role: user.role });
  } else {
    res.status(401).json({ message: "Email or password is incorrect" });
  }
});

module.exports = router;

async function userExists(email) {
  let user = await User.findOne({ where: { email } });
  if (user)
    return {
      exists: true,
      type: user.role,
      username: user.username,
      user: user,
    };

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
  const { email } = req.body;
  const userResult = await userExists(email);
  if (!userResult.exists) {
    return res.status(400).send("User does not exist");
  }

  const { otp, fullHash } = generateOTP(email);

  await userResult.user.update({
    Otp: fullHash, // Store the hashed OTP
    OtpExpires: new Date(Date.now() + 15 * 60 * 1000), // Set expiration 15 mins ahead
  });
  const mailOptions = {
    from: "sonadas.8april@gmail.com",
    to: email,
    subject: "OTP From BOOKCON",
    text: `Your OTP is for accound recovery is ${otp}`,
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
  const { email, otp } = req.body;
  const userResult = await userExists(email);
  if (!userResult.exists) {
    return res.status(400).send("User does not exist");
  }

  const user = userResult.user;
  if (!user.Otp || new Date() > user.OtpExpires) {
    return res.status(400).send("OTP expired or not found");
  }

  // Extracting the expiration time and hash from the stored Otp value
  const [storedHash, expires] = user.Otp.split(".");

  // Ensure the OTP hasn't expired
  if (new Date() > new Date(parseInt(expires))) {
    return res.status(400).send("OTP expired");
  }

  const data = `${email}.${otp}.${expires}`;
  const newCalculatedHash = crypto
    .createHmac("sha256", process.env.OTP_SECRET_KEY)
    .update(data)
    .digest("hex");

  if (newCalculatedHash === storedHash) {
    res.send("OTP verified successfully");

    // Correct the fields to null after verification
    await user.update({ Otp: null, OtpExpires: null });
  } else {
    res.status(400).send("Invalid OTP");
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;
  const userResult = await userExists(email);
  console.log("email", email);
  if (!userResult.exists) {
    return res.status(400).send("User does not exist");
  }

  const user = userResult.user;
  // const hashedPassword = await bcrypt.hash(password, 10);
  await user.update({ Password: password });
  res.send("Password reset successfully");
});

module.exports = router;
