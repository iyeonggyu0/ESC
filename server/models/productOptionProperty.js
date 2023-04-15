module.exports = (sequelize, DataTypes) => {
  const ProductOptionProperty = sequelize.define(
    "ProductOptionProperty",
    {
      ProductOptionId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      property: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ProductOptionProperty",
      tableName: "ProductOptionPropertys",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ProductOptionProperty.associate = (db) => {
    db.ProductOptionProperty.belongsTo(db.ProductOption, { foreignKey: "property", targetKey: "id" });
  };
  return ProductOptionProperty;
};
