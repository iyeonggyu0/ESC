module.exports = (sequelize, DataTypes) => {
  const ProductTag = sequelize.define(
    "ProductTag",
    {
      // 상품 id
      productId: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        unique: false,
      },
      tag: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: false,
        defaultValue: "product",
      },
      productType: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "ProductTag",
      tableName: "ProductTags",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ProductTag.associate = (db) => {
    db.ProductInquiry.belongsTo(db.Product, { foreignKey: "productId", targetKey: "id" });
  };
  return ProductTag;
};
