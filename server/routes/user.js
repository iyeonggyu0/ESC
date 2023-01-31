const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const { decryptFun, encryptFun } = require("../util/crypto");
const { sendEmail } = require("../mailer/mail");
const multer = require("multer");
const fs = require("fs");

const { User, Post } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/loginCheck", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        // include: [
        //   {
        //     model: Post,
        //   },
        // ],
      });
      const userData = encryptFun(user, process.env.REACT_APP_USER_KEY);
      res.status(200).json(userData);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, desc) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (desc) {
      return res.status(401).send(desc.reason);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        // include: [
        //   {
        //     model: Post,
        //   },
        // ],
      });
      const encryptData = await encryptFun(fullUserWithoutPassword, process.env.REACT_APP_USER_KEY);
      return res.status(200).json(encryptData);
    });
  })(req, res, next);
});

// passport 0.5.0ver ===> paspoort 0.6.0ver
router.post("/logout", isLoggedIn, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid");
    req.session.destroy();
  });
});

router.delete("/delete/:email", isLoggedIn, async (req, res) => {
  const { email } = req.params;
  const deletedCount = await User.destroy({ where: { email: `${email}` } });
  if (deletedCount) {
    // 삭제될 row가 있을 경우
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      req.session.destroy();
      res.redirect("/");
    });
  } else {
    // 삭제될 row가 없을 경우
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

router.put("/put/pw", async (req, res, next) => {
  try {
    const decryptFunPassword = await decryptFun(req.body.password, process.env.REACT_APP_USER_KEY);
    const hashedPassword = await bcrypt.hash(decryptFunPassword, 11);
    const putData = await User.update(
      {
        password: hashedPassword,
      },
      { where: { email: req.body.email } }
    );
    res.status(201).send("pw 수정 완료 / 수정된 프로필:" + putData);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put("/put/profile", async (req, res) => {
  const newPw = await decryptFun(req.body.newPassword, process.env.REACT_APP_USER_KEY);
  const basicPw = await decryptFun(req.body.password, process.env.REACT_APP_USER_KEY);
  const hashedPassword = await bcrypt.hash(newPw, 11);

  const detailedAddress = await decryptFun(req.body.detailedAddress, process.env.REACT_APP_USER_KEY);
  const address = await decryptFun(req.body.address, process.env.REACT_APP_USER_KEY);
  const newAddress = await decryptFun(req.body.newAddress, process.env.REACT_APP_USER_KEY);
  const newDetailedAddress = await decryptFun(req.body.newDetailedAddress, process.env.REACT_APP_USER_KEY);
  try {
    if (newPw) {
      const user = await User.findOne({
        where: { email: req.body.email },
      });
      const result = await bcrypt.compare(basicPw, user.password);
      if (result) {
        const putData = await User.update(
          {
            password: hashedPassword,
          },
          { where: { email: req.body.email } }
        );
        res.status(201).send("PW 수정 완료" + putData);
      }
      if (!result) {
        res.status(500).send("비밀번호가 일치하지 않습니다");
      }
    }

    if (req.body.nickName !== req.body.newNickname) {
      const putData = await User.update(
        {
          nickName: req.body.newNickname,
        },
        { where: { email: req.body.email } }
      );
      res.status(201).send("닉네임 수정 완료:" + putData);
    }

    if (req.body.email !== req.body.newEmail) {
      const putData = await User.update(
        {
          email: req.body.newEmail,
        },
        { where: { email: req.body.email } }
      );
      res.status(201).send("이메일 수정 완료:" + putData);
    }

    if (req.body.snsFlag !== req.body.newSnsFlag) {
      const putData = await User.update(
        {
          snsFlag: req.body.newSnsFlag,
        },
        { where: { email: req.body.email } }
      );
      res.status(201).send("SNS수신동의 수정 완료:" + putData);
    }

    if (newAddress !== address || newDetailedAddress !== detailedAddress) {
      const putData = await User.update(
        {
          address: newAddress,
          detailedAddress: newDetailedAddress,
        },
        { where: { email: req.body.email } }
      );
      res.status(201).send("주소 수정 완료:" + putData);
    }
  } catch (err) {
    console.error(err);
  }
});

router.put("/put/profile/img", async (req, res) => {
  if (req.body.fileName === "/img/profileImg/basicProfileImg.png") {
    const putData = await User.update(
      {
        profileImg: req.body.newFileName,
      },
      { where: { email: req.body.email } }
    );
    res.status(201).send("프로필이미지 경로 수정완료" + putData);
  } else if (req.body.fileName !== "/img/profileImg/basicProfileImg.png") {
    if (fs.existsSync("../client/public/img/profileImg/uploads/" + req.body.fileName)) {
      // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
      try {
        fs.unlinkSync("../client/public/img/profileImg/uploads/" + req.body.fileName);
        console.log("image delete");
        const putData = await User.update(
          {
            profileImg: req.body.newFileName,
          },
          { where: { email: req.body.email } }
        );
        res.status(201).send("프로필이미지 경로 수정완료" + putData);
      } catch (error) {
        console.log(error);
      }
    } else {
      const putData = await User.update(
        {
          profileImg: req.body.newFileName,
        },
        { where: { email: req.body.email } }
      );
      res.status(201).send("프로필이미지 경로 수정완료" + putData);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailCheck) {
      return res.status(402).send("이미 사용 중인 이메일 입니다.");
    }
    const decryptFunPassword = await decryptFun(req.body.password, process.env.REACT_APP_USER_KEY);
    const hashedPassword = await bcrypt.hash(decryptFunPassword, 11);
    const singupUser = await User.create({
      email: req.body.email,
      userName: req.body.name,
      nickName: req.body.nickName,
      password: hashedPassword,
      hpNumber: req.body.hpNumber,
      snsFlag: req.body.snsFlag,
      // authority: "admin",
    });
    res.status(201).send("회원가입 완료\n" + singupUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/sendEmail", async (req, res, next) => {
  try {
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const bcryptAuthCode = await decryptFun(req.body.auth, process.env.REACT_APP_USER_KEY);

    if (emailCheck) {
      if (req.body.check) {
        return res.status(402).send("이미 사용 중인 이메일 입니다.");
      }
      if (!req.body.check) {
        sendEmail(req.body.email, bcryptAuthCode);
        return res.status(200).json({
          success: true,
        });
      }
    } else {
      if (!req.body.check) {
        return res.status(403).send("가입되지 않은 이메일입니다.");
      }
      if (req.body.check) {
        sendEmail(req.body.email, bcryptAuthCode);
        return res.status(200).json({
          success: true,
        });
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
