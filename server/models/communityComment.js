module.exports = (sequelize, DataTypes) => {
  const CommunityComment = sequelize.define(
    "CommunityComment",
    {
      postId: {
        type: DataTypes.INTEGER(50),
        allowNull: false,
      },
      // 작성자 메일
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      // 내용
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "CommunityComment",
      tableName: "CommunityComments",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  CommunityComment.associate = (db) => {
    // 포스트
    db.CommunityComment.belongsTo(db.CommunityPost, {
      foreignKey: "postId",
      targetKey: "id",
    });
    // 작성자
    db.CommunityComment.belongsTo(db.User, {
      foreignKey: "email",
      targetKey: "email",
    });
    // 좋아요
    db.CommunityComment.hasMany(db.CommunityCommentLike, {
      foreignKey: "CommentId",
      sourceKey: "id",
    });
  };
  return CommunityComment;
};
