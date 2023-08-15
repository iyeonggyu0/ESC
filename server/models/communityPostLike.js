module.exports = (sequelize, DataTypes) => {
  const CommunityPostLike = sequelize.define(
    "CommunityPostLike",
    {
      UserEmail: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true,
        targetKey: "email",
      },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "CommunityPostLike",
      tableName: "CommunityPostLikes",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  // 상품
  CommunityPostLike.associate = (db) => {
    db.CommunityPostLike.belongsTo(db.User, {
      foreignKey: "UserEmail",
      targetKey: "email",
    });
    db.CommunityPostLike.belongsTo(db.ProductReview, {
      foreignKey: "PostId",
      targetKey: "id",
    });
  };
  return CommunityPostLike;
};
