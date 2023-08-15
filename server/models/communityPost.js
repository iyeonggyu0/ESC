module.exports = (sequelize, DataTypes) => {
  const CommunityPost = sequelize.define(
    "CommunityPost",
    {
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
      modelName: "CommunityPost",
      tableName: "CommunityPosts",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  // 상품
  CommunityPost.associate = (db) => {
    //작성자
    db.CommunityPost.belongsTo(db.User, {
      foreignKey: "email",
      targetKey: "email",
    });
    db.CommunityPost.belongsToMany(db.User, { through: "CommunityPostLike", foreignKey: "PostId" });
    db.CommunityPost.hasMany(db.CommunityComment, {
      foreignKey: "postId",
      sourceKey: "id",
    });
  };
  return CommunityPost;
};
