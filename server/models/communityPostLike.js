module.exports = (sequelize, DataTypes) => {
  const CommunityPostLike = sequelize.define(
    "CommunityPostLike",
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    // 커뮤니티 게시물에 대한 좋아요
    db.CommunityPostLike.belongsTo(db.CommunityPost, {
      foreignKey: "PostId",
      targetKey: "id",
    });
  };
  return CommunityPostLike;
};
