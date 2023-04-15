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
      property: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ProductOption",
      tableName: "ProductOptions",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ProductOption.associate = (db) => {
    db.ProductOption.hasMany(db.ProductOptionProperty, { foreignKey: "property", sourceKey: "id" });
  };
  return ProductOption;
};
