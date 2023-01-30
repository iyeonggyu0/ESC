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
      img: "/" + req.body.img,
      detailedImg: "/" + req.body.detailedImg,
    });
    res.status(201).send("상품 생성:" + data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/get/all/:filter/:sort", async (req, res) => {
  const { filter } = req.params;
  const { sort } = req.params;

  let order;
  let orderSort;
  if (sort === "인기") {
    order = "sale";
    orderSort = "DESC";
  }
  if (sort === "가격 높은 순") {
    order = "price";
    orderSort = "DESC";
  }
  if (sort === "가격 낮은 순") {
    order = "price";
    orderSort = "ASC";
  }
  if (sort === "추천") {
    order = "like";
    orderSort = "DESC";
  }
  if (sort === "별점") {
    order = "grade";
    orderSort = "DESC";
  }

  try {
    if (filter === "ALL") {
      const data = await Product.findAll({ order: [[order, orderSort]] });
      res.status(201).send(data);
    } else {
      const data = await Product.findAll({
        where: {
          type: filter,
        },
        order: [[order, orderSort]],
      });
      res.status(201).send(data);
    }
  } catch (err) {
    console.error(err);
  }

  // 전체 검색
  // if (filter === "ALL") {
  //   try {
  //     const data = await Product.findAll();
  //     res.status(201).send(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
});

router.get("/get/one/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const oneData = await Product.findOne({
      where: { id: productId },
    });
    res.status(201).send(oneData);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/delete/:productId", async (req, res) => {
  const { productId } = req.params;
  const deletedCount = await Product.destroy({ where: { id: productId } });
  if (!deletedCount) {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

module.exports = router;
