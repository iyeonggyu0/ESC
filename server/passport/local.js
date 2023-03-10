const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { decryptFun } = require("../util/crypto");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다." });
          }
          const decryptFunPassword = await decryptFun(password, process.env.REACT_APP_USER_KEY);
          const result = await bcrypt.compare(decryptFunPassword, user.password);
          if (result) {
            return done(null, user);
          }

          return done(null, false, { reason: "비밀번호가 일치하지 않습니다." });
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
