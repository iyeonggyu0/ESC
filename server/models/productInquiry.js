module.exports = (sequelize, DataTypes) => {
  const ProductInquiry = sequelize.define(
    "ProductInquiry",
    {
      productId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
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
      modelName: "ProductInquiry",
      tableName: "ProductInquirys",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ProductInquiry.associate = (db) => {
    db.ProductInquiry.belongsTo(db.Product, { foreignKey: "productId", targetKey: "id" });
    db.ProductInquiry.belongsTo(db.User, { foreignKey: "email", targetKey: "email" });
    db.ProductInquiry.hasOne(db.ProductAnswer, { foreignKey: "inquiryId", sourceKey: "id" });
  };
  return ProductInquiry;
};
