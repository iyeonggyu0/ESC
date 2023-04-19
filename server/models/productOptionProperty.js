module.exports = (sequelize, DataTypes) => {
  const ProductOptionProperty = sequelize.define(
    "ProductOptionProperty",
    {
      ProductOptionId: {
        type: DataTypes.INTEGER,
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
    db.ProductOptionProperty.belongsTo(db.ProductOption, { foreignKey: "ProductOptionId", targetKey: "id" });
  };
  return ProductOptionProperty;
};
