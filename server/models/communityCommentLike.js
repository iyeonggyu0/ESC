module.exports = (sequelize, DataTypes) => {
  const CommunityCommentLike = sequelize.define(
    "CommunityCommentLike",
    {
      UserEmail: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true,
        targetKey: "email",
      },
      CommentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "CommunityCommentLike",
      tableName: "CommunityCommentLikes",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  // 상품
  CommunityCommentLike.associate = (db) => {
    db.CommunityCommentLike.belongsTo(db.User, {
      foreignKey: "UserEmail",
      targetKey: "email",
    });
    db.CommunityCommentLike.belongsTo(db.CommunityComment, {
      foreignKey: "CommentId",
      targetKey: "id",
    });
  };
  return CommunityCommentLike;
};
