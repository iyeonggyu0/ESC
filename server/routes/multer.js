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
const fsExtra = require("fs-extra");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

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

router.post("/upload/:tpye/:name", (req, res) => {
  const type = req.params.tpye;
  const name = req.params.name;

  try {
    fs.readdirSync(`../client/public/img/${type}/${name}`); // 폴더 확인
  } catch (err) {
    console.error(`img/${type}/${name} 폴더가 없습니다. 폴더를 생성합니다.`);
    fs.mkdirSync(`../client/public/img/${type}/${name}`); // 폴더 생성
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `../client/public/img/${type}/${name}/`);
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
  }).array(`${type}`);

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    const imgs = req.files.map((file) => ({
      fileName: file.filename,
    }));
    return res.json({
      success: true,
      imgs,
      image: req.files[0].path,
      imagePath: `/img/${type}/${name}`,
      imagePathName: `/img/${type}/${name}/${req.files[0].filename}`,
    });
  });
  router.use(`../client/public/img/${type}/${name}`, express.static(path.join(__dirname, `../client/public/img/${type}/${name}`)));
});

router.post("/delete/route", async (req, res) => {
  const route = req.body.route;
  if (route === null) {
    res.status(403).send(`null`);
  } else {
    const directory = fs.existsSync(`../client/public/${route}`);
    if (!directory) {
      return res.status(404).send("Not Found");
    }
    if (directory) {
      try {
        fs.rmdirSync(`../client/public/${route}`, { recursive: true });
        console.log("image delete");
        res.status(201).send(`../client/public/${route} 이미지 삭제완료`);
      } catch (error) {
        console.log(error);
      }
    }
  }
});

router.post("/delete/fill", async (req, res) => {
  const route = req.body.route;
  if (route === null) {
    res.status(403).send(`null`);
  } else {
    try {
      fs.unlink(`../client/public${route}`, function (err) {
        if (err) {
          console.log("Error : ", err);
        }
      });
      console.log("image delete");
      res.status(201).send(`../client/public${route} 이미지 삭제완료`);
    } catch (error) {
      console.log(error);
    }
  }
});

router.put("/route/put", async (req, res) => {
  fs.rename(`../client/public${req.body.route}`, `../client/public${req.body.newRoute}`, (err) => {
    if (err) throw err;
    res.status(201).send(req.body.newRoute);
  });
});

router.post("/route/copy", async (req, res) => {
  const sourcePath = `../client/public${req.body.route}`;
  const targetPath = `../client/public${req.body.newRoute}`;

  const basename = path.basename(sourcePath);
  const newFolderName = `${basename} copy`;
  const newFolderPath = path.join(targetPath, newFolderName);

  fsExtra
    .copy(sourcePath, newFolderPath)
    .then(() => res.status(201).send("성공"))
    .catch((err) => console.error(err));
});

router.post("/community/upload/:imageNum", async (req, res) => {
  function createCommunityFolder() {
    const randomNumber = Math.floor(Math.random() * 999999) + 1; // 1 이상 999999 이하의 랜덤 숫자 생성
    const randomSixDigitNumber = randomNumber.toString().padStart(6, "0"); // 0으로 채워 6자리로 만듦
    const folderPath = `../client/public/img/community/${randomSixDigitNumber}`;
    try {
      fsExtra.ensureDirSync(folderPath); // 하위 폴더 생성
      console.log(`폴더 생성 완료: ${folderPath}`);
    } catch (err) {
      console.error(`폴더 생성 실패: ${folderPath}`);
      createCommunityFolder(); // 폴더 생성 실패 시 재시도
    }

    return randomSixDigitNumber;
  }

  let randomSixDigitNumber = 0;
  const { imageNum } = req.params;
  console.log(imageNum);

  if (imageNum !== "none") {
    randomSixDigitNumber = imageNum;
  } else if (imageNum === "none") {
    randomSixDigitNumber = createCommunityFolder();
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `../client/public/img/community/${randomSixDigitNumber}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
    },
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) cb(null, true);
      else cb(new Error("해당 파일의 형식을 지원하지 않습니다."), false);
    },
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  }).array("file");

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    const imgs = req.files.map((file) => ({
      fileName: file.filename,
    }));

    return res.json({
      success: true,
      imgs,
      image: req.files[0].path,
      imagePath: `/img/community/${randomSixDigitNumber}`,
      imagePathName: `/img/community/${randomSixDigitNumber}/${req.files[0].filename}`,
      randomSixDigitNumber: randomSixDigitNumber,
    });
  });

  router.use(`/img/community/${randomSixDigitNumber}`, express.static(path.join(__dirname, `../client/public/img/community/${randomSixDigitNumber}`)));
});

module.exports = router;
