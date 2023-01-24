const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const { decryptFun, encryptFun } = require("../util/crypto");
const { sendEmail } = require("../mailer/mail");
const path = require("path");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const fs = require("fs");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

// 프로필 Multer
// try {
//   fs.readdirSync("../client/public/img/profileImg/uploads"); // 폴더 확인
// } catch (err) {
//   console.error("uploads 폴더가 없습니다. 폴더를 생성합니다.");
//   fs.mkdirSync("../client/public/img/profileImg/uploads"); // 폴더 생성
// }

// const profileMulterStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../client/public/img/profileImg/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
//   limits: { fileSize: 1 * 1024 * 1024 },
// });
// const profileUpload = multer({ storage: profileMulterStorage }).single("profile_img");

router.post("/upload/profile", isLoggedIn, (req, res) => {
  try {
    fs.readdirSync("../client/public/img/profileImg/uploads"); // 폴더 확인
  } catch (err) {
    console.error("uploads 폴더가 없습니다. 폴더를 생성합니다.");
    fs.mkdirSync("../client/public/img/profileImg/uploads"); // 폴더 생성
  }

  const profileMulterStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../client/public/img/profileImg/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    limits: { fileSize: 1 * 1024 * 1024 },
  });

  const profileUpload = multer({ storage: profileMulterStorage }).single("profile_img");

  profileUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// product enrollment
// try {
//   fs.readdirSync("../client/public/img/product/uploads"); // 폴더 확인
// } catch (err) {
//   console.error("uploads 폴더가 없습니다. 폴더를 생성합니다.");
//   fs.mkdirSync("../client/public/img/product/uploads"); // 폴더 생성
// }

// const productEnrollmentStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../client/public/img/product/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
//   },
// });

// const productEnrollmentUpload = multer({
//   // (6)
//   productEnrollmentStorage,
//   fileFilter: (req, file, cb) => {
//     if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) cb(null, true);
//     else cb(new Error("해당 파일의 형식을 지원하지 않습니다."), false);
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// });
//
router.post("/upload/productEnrollment", (req, res) => {
  try {
    fs.readdirSync("../client/public/img/product/uploads"); // 폴더 확인
  } catch (err) {
    console.error("uploads 폴더가 없습니다. 폴더를 생성합니다.");
    fs.mkdirSync("../client/public/img/product/uploads"); // 폴더 생성
  }

  const productEnrollmentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../client/public/img/product/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
    },
  });

  const productEnrollmentUpload = multer({
    // (6)
    productEnrollmentStorage,
    fileFilter: (req, file, cb) => {
      if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) cb(null, true);
      else cb(new Error("해당 파일의 형식을 지원하지 않습니다."), false);
    },
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  }).single("file");

  productEnrollmentUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
  router.use("../client/public/img/product/uploads", express.static(path.join(__dirname, "../client/public/img/product/uploads")));
});

module.exports = router;
