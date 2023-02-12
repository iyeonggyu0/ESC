module.exports = (sequelize, DataTypes) => {
  const UserProductReviewLike = sequelize.define(
    "UserProductReviewLike",
    {
      UserEmail: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true,
        targetKey: "email",
      },
      ProductReviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "UserProductReviewLike",
      tableName: "UserProductReviewLikes",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  // 상품
  UserProductReviewLike.associate = (db) => {
    db.UserProductReviewLike.belongsTo(db.User, {
      foreignKey: "UserEmail",
      targetKey: "email",
    });
    db.UserProductReviewLike.belongsTo(db.ProductReview, {
      foreignKey: "ProductReviewId",
      targetKey: "id",
    });
  };
  return UserProductReviewLike;
};
