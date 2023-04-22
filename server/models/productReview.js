module.exports = (sequelize, DataTypes) => {
  const ProductReview = sequelize.define(
    "ProductReview",
    {
      // 상품 ID
      productId: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      // 작성자 메일
      reviewerEmail: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      // 별점
      reviewerGrade: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      // 도움됬어요
      reviewLike: {
        type: DataTypes.INTEGER(20),
        allowNull: true,
        defaultValue: 0,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ProductReview",
      tableName: "ProductReviews",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  // 상품
  ProductReview.associate = (db) => {
    db.ProductReview.belongsTo(db.Product, {
      foreignKey: "productId",
    });
    // // 작성자
    db.ProductReview.belongsTo(db.User, {
      foreignKey: "reviewerEmail",
      targetKey: "email",
    });
    db.ProductReview.belongsToMany(db.User, { through: "UserProductReviewLike", foreignKey: "ProductReviewId" });
  };
  return ProductReview;
};
