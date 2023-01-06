module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
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
    // db.User.hasMany(db.Post);
    // db.User.hasMany(db.Comment);
    // db.User.hasMany(db.Reply);
  };
  return User;
};