module.exports = (sequelize, DataTypes) => {
  const UserProductReviewLike = sequelize.define("UserProductReviewLike", {
    UserId: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "email",
      },
    },
    ProductReviewId: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductReview,
        key: "id",
      },
    },
  });

  return UserProductReviewLike;
};
