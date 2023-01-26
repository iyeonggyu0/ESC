const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const { decryptFun, encryptFun } = require("../util/crypto");
const { sendEmail } = require("../mailer/mail");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const { Product } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const data = await Product.create({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      img: req.body.img,
      detailedImg: req.body.detailedImg,
    });
    res.status(201).send("상품 생성:" + data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
