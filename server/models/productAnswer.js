module.exports = (sequelize, DataTypes) => {
  const ProductAnswer = sequelize.define(
    "ProductAnswer",
    {
      productId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
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
      modelName: "ProductAnswer",
      tableName: "ProductAnswers",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ProductAnswer.associate = (db) => {
    db.ProductInquiry.belongsTo(db.Product, { foreignKey: "productId", targetKey: "id" });
    db.ProductAnswer.belongsTo(db.ProductInquiry, { foreignKey: "inquiryId", targetKey: "id" });
  };
  return ProductAnswer;
};
