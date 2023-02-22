// ================= Impoting Modules ===============

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();


// ================= Model Location =================
const { FirstData , Register , Login , LogOut } = require('../Controllers/UserController')

// ================= Redis Location =================
// const { client } = require("../Configs/redis");


const UserRouter = express.Router();

// Routers

UserRouter.get("/alldata", FirstData);

// ================= OTP GENERATE ========================
function generateOtp() {
  let OTP = Math.floor(Math.random() * 999999);
  return OTP;
}

// ================= Sending OTP to Mail =================
var otpdata;
function Sendmail(OTP, EmailId) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.GMAIL_KEY,
    },
  });

  transporter
    .sendMail({
      to: `${EmailId}`,
      from: "Facetime@gmail.com",
      subject: "Face App OTP Mailer",
      text: `Please Verify your email address OTP is : ${OTP}`,
    })
    .then(() => {
      console.log("Mail Sent Successfully");
    })
    .catch((error) => {
      console.log(`Error in Sending Mail + ${error.message}`);
    });
}

UserRouter.post("/register", Register);

UserRouter.post("/login", Login);


UserRouter.get('/logout', LogOut)


module.exports = { UserRouter };
