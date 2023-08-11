const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require("./user")(sequelize, Sequelize);

//Products
db.Product = require("./product")(sequelize, Sequelize);
db.UserProductReviewLike = require("./UserProductReviewLike")(sequelize, Sequelize);

db.ProductReview = require("./productReview")(sequelize, Sequelize);
db.ProductDiscount = require("./productDiscount")(sequelize, Sequelize);
db.ProductInquiry = require("./productInquiry")(sequelize, Sequelize);
db.ProductAnswer = require("./productAnswer")(sequelize, Sequelize);
db.ProductTag = require("./productTag")(sequelize, Sequelize);
db.ProductImg = require("./productImg")(sequelize, Sequelize);

db.ProductOptionProperty = require("./productOptionProperty")(sequelize, Sequelize);
db.ProductOption = require("./productOption")(sequelize, Sequelize);

db.ShoppingBag = require("./shoppingBag")(sequelize, Sequelize);

db.Payment = require("./payment")(sequelize, Sequelize);
db.CancelPayment = require("./cancelPayment")(sequelize, Sequelize);

db.Servicenquiry = require("./serviceInquiry")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
