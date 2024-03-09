const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
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
  let user = await User.findOne({ where: { Email: email } });
  const hash = crypto
    .createHmac("sha256", process.env.PASSWORD_SECRET_KEY)
    .update(password)
    .digest("hex")
    .substring(0, 15);

  if (user && user.Password && user.Password === hash) {
    // const payload = {
    //   userId: user._id,
    //   role: user.Role,
    // };
    // const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    req.session.isAuth = true;
    req.session.userId = user._id;
    req.session.role = user.Role;
    res.json({
      status: "success",
      payload: { userId: user._id, role: user.Role },
    });
  } else {
    res.status(401).json({ message: "Email or password is incorrect" });
  }
});

router.get("/checkSession", async (req, res) => {
  if (req.session.isAuth) {
    res.json({
      status: "success",
      payload: { userId: req.session.userId, role: req.session.role },
    });
  } else {
    res.json({ status: "failure" });
  }
});

// logout
router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ status: "error", error: err });
    }
    res.json({ status: "success" });
  });
});

async function userExists(email) {
  let user = await User.findOne({ where: { Email: email } });
  if (user)
    return {
      exists: true,
      type: user.role,
      username: user.username,
      user: user,
    };

  return { exists: false };
}

function generateOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6 digit OTP
  const ttl = 15 * 60 * 1000; // 15 minutes in milliseconds
  const expires = Date.now() + ttl;
  const trimmedEmail = email.trim(); // Trim the email to remove extra spaces
  const data = `${trimmedEmail}.${otp}`;
  const hash = crypto
    .createHmac("sha256", process.env.OTP_SECRET_KEY)
    .update(data)
    .digest("hex")
    .substring(0, 15);
  console.log("email", trimmedEmail);
  console.log("otp", otp);
  return { otp, fullHash: hash };
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
  const trimmedEmail = email.trim(); // Trim the email
  const userResult = await userExists(trimmedEmail);

  if (!userResult.exists) {
    return res.status(400).send("User does not exist");
  }

  const user = userResult.user;
  if (!user.Otp || new Date() > user.OtpExpires) {
    return res.status(400).send("OTP expired or not found");
  }

  const data = `${trimmedEmail}.${otp.trim()}`; // Ensure both email and otp are trimmed
  const newCalculatedHash = crypto
    .createHmac("sha256", process.env.OTP_SECRET_KEY)
    .update(data)
    .digest("hex")
    .substring(0, 15);
  console.log("otp", user.Otp);
  if (newCalculatedHash === user.Otp) {
    res.send("OTP verified successfully");
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
  const hash = crypto
    .createHmac("sha256", process.env.PASSWORD_SECRET_KEY)
    .update(password)
    .digest("hex")
    .substring(0, 15);
  await user.update({ Password: hash });
  res.send("Password reset successfully");
});

module.exports = router;
