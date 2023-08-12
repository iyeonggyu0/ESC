module.exports = (sequelize, DataTypes) => {
  const ServiceInquiry = sequelize.define(
    "ServiceInquiry",
    {
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      // 문의유형
      inquiryType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      // 비밀설정
      secret: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      // 제목
      title: {
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
      modelName: "ServiceInquiry",
      tableName: "ServiceInquirys",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ServiceInquiry.associate = (db) => {
    db.ServiceInquiry.belongsTo(db.User, { foreignKey: "email", targetKey: "email" });
    db.ServiceInquiry.hasOne(db.ServiceAnswer, { foreignKey: "inquiryId", sourceKey: "id" });
  };
  return ServiceInquiry;
};
