module.exports = (sequelize, DataTypes) => {
  const ShoppingBag = sequelize.define(
    "ShoppingBag",
    {
      productId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: 1,
      },
      options: {
        type: DataTypes.JSON, // 배열의 타입을 지정
        allowNull: true, // null 허용 여부
        defaultValue: null,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ShoppingBag",
      tableName: "ShoppingBags",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ShoppingBag.associate = (db) => {
    db.ShoppingBag.belongsTo(db.User, { foreignKey: "userEmail", targetKey: "email", onDelete: "CASCADE" });
    db.ShoppingBag.belongsTo(db.Product, { foreignKey: "productId", targetKey: "id" });
  };
  return ShoppingBag;
};
