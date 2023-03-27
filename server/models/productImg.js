module.exports = (sequelize, DataTypes) => {
  const ProductImg = sequelize.define(
    "ProductImg",
    {
      productId: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      // 이미지경로
      img: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "/img/product/notImg.png",
      },
      // tpye 종류: main:메인 이미지, assist: 상품 추가이미지, detailedImg: 상품 상세 이미지
      type: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "assist",
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "ProductImg",
      tableName: "ProductImgs",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  ProductImg.associate = (db) => {
    db.ProductImg.belongsTo(db.Product, { foreignKey: "productId", targetKey: "id" });
  };
  return ProductImg;
};
