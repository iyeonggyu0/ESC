module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      // 상품 이름
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: false,
      },
      // 타입
      type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      // 가격
      price: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      // 별점
      grade: {
        type: DataTypes.INTEGER(20),
        allowNull: true,
        defaultValue: 0,
      },
      // 좋아요
      like: {
        type: DataTypes.INTEGER(20),
        allowNull: true,
        defaultValue: 0,
      },
      // 상품 예시 이미지
      img: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "/img/product/notImg.png",
      },
      detailedImg: {
        // 상품 상세 이미지
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "/img/product/notImg.png",
      },
      sale: {
        // 판매 수
        type: DataTypes.INTEGER(20),
        allowNull: true,
        defaultValue: 0,
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
    db.Product.hasMany(db.ProductReview);
    db.Product.hasOne(db.ProductDiscount, {
      foreignKey: "productId",
      sourceKey: "id",
    });
    db.Product.hasMany(db.ProductInquiry, {
      foreingKey: "productId",
      sourceKey: "id",
    });
  };
  return Product;
};
