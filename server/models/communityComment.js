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
      // 제목
      title: {
        type: DataTypes.STRING(100),
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
  // 상품
  CommunityComment.associate = (db) => {
    db.CommunityComment.belongsTo(db.CommunityPost, {
      foreignKey: "postId",
      targetKey: "id",
    });
    // 작성자
    db.CommunityComment.belongsTo(db.User, {
      foreignKey: "email",
      targetKey: "email",
    });
    db.CommunityComment.belongsToMany(db.User, { through: "CommunityCommentLike", foreignKey: "CommentId" });
  };
  return CommunityComment;
};
