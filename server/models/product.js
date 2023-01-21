module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: false,
      },
      type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "/img/product/notImg.png",
      },
      grade: {
        type: DataTypes.INTEGER(20),
        allowNull: true,
        defaultValue: false,
      },
      review: {
        type: DataTypes.INTEGER(20),
        allowNull: true,
      },
      detailedDescription: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Product",
      tableName: "Products",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Product.associate = (db) => {
    // db.User.hasMany(db.Post);
    // db.User.hasMany(db.Comment);
    // db.User.hasMany(db.Reply);
  };
  return Product;
};
