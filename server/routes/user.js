const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();

const { User, Post } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/", isLoggedIn, async (req, res, next) => {
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
      res.status(200).json(user);
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
      return res.status(200).json(fullUserWithoutPassword);
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
    res.redirect("/");
  });
});

router.delete("/delete", isLoggedIn, async (req, res) => {
  const { email } = req.session.email;
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

router.put("/put", isLoggedIn, async (req, res, next) => {
  // const { dataName } = req.params; /:dataName

  if (req.body.password) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 11);
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
  } else if (!req.body.password) {
    try {
      const putData = await User.update(
        {
          name: req.body.name,
          profileImg: req.body.profileImg,
        },
        { where: { email: req.body.email } }
      );
      res.status(201).send("수정 완료 / 수정된 프로필:" + putData);
    } catch (err) {
      console.error(err);
      next(err);
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
      return res.status(403).send("이미 사용 중인 이메일 입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    const singupUser = await User.create({
      email: req.body.email,
      userName: req.body.name,
      nickName: req.body.nickName,
      password: hashedPassword,
      hpNumber: req.body.hpNumber,
      snsFlag: req.body.snsFlag,
      authority: req.body.authority,
    });
    res.status(201).send("회원가입 완료\n" + singupUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
