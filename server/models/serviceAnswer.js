module.exports = (sequelize, DataTypes) => {
  const ServiceAnswer = sequelize.define(
    "ServiceAnswer",
    {
      // 질문 Id
      inquiryId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      // 이메일
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      // 답변 내용
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ServiceAnswer",
      tableName: "ServiceAnswers",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ServiceAnswer.associate = (db) => {
    db.ServiceAnswer.belongsTo(db.ServiceInquiry, { foreignKey: "inquiryId", targetKey: "id" });
  };
  return ServiceAnswer;
};
