module.exports = (sequelize, DataTypes) => {
  const ProductOptionProperty = sequelize.define(
    "ProductOptionProperty",
    {
      productId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      ProductOptionId: {
        type: DataTypes.INTEGER(100),
        allowNull: true,
      },
      property: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER(50),
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "ProductOptionProperty",
      tableName: "ProductOptionPropertys",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ProductOptionProperty.associate = (db) => {
    db.ProductOptionProperty.belongsTo(db.ProductOption, { foreignKey: "ProductOptionId", targetkey: "id", onDelete: "cascade", onUpdate: "cascade" });
    db.ProductOptionProperty.belongsTo(db.Product, { foreignKey: "productId", targetkey: "id" });
  };
  return ProductOptionProperty;
};
