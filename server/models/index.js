const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require("./user")(sequelize, Sequelize);
db.Product = require("./product")(sequelize, Sequelize);
db.ProductReview = require("./productReview")(sequelize, Sequelize);
db.UserProductReviewLike = require("./UserProductReviewLike")(sequelize, Sequelize);
// db.Post = require("./post")(sequelize, Sequelize);
// db.Reply = require("./reply")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
