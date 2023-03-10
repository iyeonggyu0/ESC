module.exports = (sequelize, DataTypes) => {
  const ProductDiscount = sequelize.define(
    "ProductDiscount",
    {
      // 할인 상품
      productId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      // 할인 금액
      discountAmount: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      // 삭제 (년)
      periodYear: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      // 삭제 (월)
      periodMonth: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      // 삭제 (일)
      periodDate: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ProductDiscount",
      tableName: "ProductDiscounts",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ProductDiscount.associate = (db) => {
    db.ProductDiscount.belongsTo(db.Product, {
      foreignKey: "productId",
      targetKey: "id",
    });
  };
  return ProductDiscount;
};
