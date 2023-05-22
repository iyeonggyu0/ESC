module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      nickName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      hpNumber: {
        type: DataTypes.STRING(14),
        allowNull: false,
      },
      profileImg: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "/img/profileImg/basicProfileImg.png",
      },
      authority: {
        type: DataTypes.STRING(6),
        allowNull: true,
        defaultValue: "user",
      },
      snsFlag: {
        type: DataTypes.STRING(3),
        allowNull: true,
        defaultValue: false,
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      detailedAddress: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "User",
      tableName: "users",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.ProductReview, {
      foreignKey: "reviewerEmail",
      sourceKey: "email",
    });
    db.User.belongsToMany(db.ProductReview, { through: "UserProductReviewLike", foreignKey: "UserEmail" });
    db.User.hasMany(db.ProductInquiry, {
      foreignKey: "email",
      sourceKey: "email",
    });
    db.User.hasMany(db.ShoppingBag, { foreignKey: "userEmail", sourceKey: "email", onDelete: "CASCADE" });
    db.User.hasMany(db.Payment, { foreignKey: "userEmail", sourceKey: "email", onDelete: "CASCADE" });
  };
  return User;
};
