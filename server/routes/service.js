const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const { decryptFun, encryptFun } = require("../util/crypto");
const { sendEmail } = require("../mailer/mail");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const { Op, where } = require("sequelize");

const { Servicenquiry } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const payment = require("../models/payment");
const productOptionProperty = require("../models/productOptionProperty");

// isLoggedIn
router.get("/inquiry/post", isLoggedIn, async (req, res) => {
  const { email, title, inquiryType, contents, secret } = req.body;
  try {
    await Servicenquiry.create({
      email: email,
      inquiryType: inquiryType,
      secret: secret,
      title: title,
      content: contents,
    });
    res.status(201).send("성공");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
