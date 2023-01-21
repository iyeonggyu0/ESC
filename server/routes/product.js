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

try {
  fs.readdirSync("../client/public/img/product/uploads"); // 폴더 확인
} catch (err) {
  console.error("uploads 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("../client/public/img/product/uploads"); // 폴더 생성
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/img/product/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  // (6)
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) cb(null, true);
    else cb(new Error("해당 파일의 형식을 지원하지 않습니다."), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json(req.file);
});

router.use("../client/public/img/product/uploads", express.static(path.join(__dirname, "../client/public/img/product/uploads")));

module.exports = router;
