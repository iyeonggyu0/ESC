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

const { ServiceInquiry, ServiceAnswer, User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const payment = require("../models/payment");
const productOptionProperty = require("../models/productOptionProperty");

// isLoggedIn
router.post("/inquiry/post", isLoggedIn, async (req, res) => {
  const { email, title, inquiryType, contents, secret } = req.body;
  try {
    await ServiceInquiry.create({
      email: email,
      inquiryType: inquiryType.label,
      secret: secret,
      title: title,
      content: contents,
    });
    res.status(201).send("성공");
  } catch (err) {
    console.error(err);
  }
});

router.get("/get", async (req, res) => {
  try {
    const data = await ServiceInquiry.findAll({
      include: [
        {
          model: ServiceAnswer,
          attributes: ["content"],
        },
      ],
    });
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/delete/inquiry/:inquiryId", isLoggedIn, async (req, res) => {
  const { inquiryId } = req.params;

  try {
    await ServiceInquiry.destroy({
      where: { id: inquiryId },
    });

    const data = await ServiceAnswer.findOne({ where: { inquiryId: inquiryId } });
    if (data) {
      await ServiceAnswer.destroy({
        where: { inquiryId: inquiryId },
      });
    }

    res.status(201).send("성공");
  } catch (err) {
    console.error(err);
  }
});

router.post("/answer/post", isLoggedIn, async (req, res) => {
  const { email, contents, inquiryId } = req.body;
  try {
    const data = await ServiceAnswer.create({
      inquiryId: inquiryId,
      email: email,
      content: contents,
    });
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/delete/answer/:inquiryId", isLoggedIn, async (req, res) => {
  const { inquiryId } = req.params;

  try {
    await ServiceAnswer.destroy({
      where: { inquiryId: inquiryId },
    });

    res.status(201).send("성공");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
