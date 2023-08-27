module.exports = (sequelize, DataTypes) => {
  const CommunityCommentLike = sequelize.define(
    "CommunityCommentLike",
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CommentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER(50),
        allowNull: false,
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
    db.CommunityCommentLike.belongsTo(db.CommunityComment, {
      foreignKey: "CommentId",
      targetKey: "id",
    });
    db.CommunityCommentLike.belongsTo(db.CommunityPost, {
      foreignKey: "postId",
      targetKey: "id",
    });
  };
  return CommunityCommentLike;
};
