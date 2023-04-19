module.exports = (sequelize, DataTypes) => {
  const ProductOption = sequelize.define(
    "ProductOption",
    {
      productId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      optionName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "ProductOption",
      tableName: "ProductOptions",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ProductOption.associate = (db) => {
    db.ProductOption.belongsTo(db.Product, { foreignKey: "productId", targetKey: "id" });
    db.ProductOption.hasMany(db.ProductOptionProperty, { foreignKey: "ProductOptionId", targetKey: "id" });
  };
  return ProductOption;
};