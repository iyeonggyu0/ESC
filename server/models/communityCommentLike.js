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
  };
  return CommunityCommentLike;
};
