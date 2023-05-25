module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      // 이메일
      userEmail: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // 결제금액
      amountOfPayment: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      // 상품 원금
      productPrice: {
        type: DataTypes.INTEGER(20),
        allowNull: true,
        defaultValue: 0,
      },
      // 할인금액
      discount: {
        type: DataTypes.INTEGER(20),
        allowNull: true,
        defaultValue: 0,
      },
      // 배송비
      deliveryFee: {
        type: DataTypes.INTEGER(20),
        allowNull: true,
        defaultValue: 0,
      },
      // 배송상태
      deliveryStatus: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "주문접수",
      },
      // 송장번호
      invoiceNumber: {
        type: DataTypes.INTEGER(100),
        allowNull: true,
        defaultValue: 0,
      },
      //구매상품 정보
      purchaseProductInformation: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Payment",
      tableName: "Payments",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Payment.associate = (db) => {
    db.Payment.belongsTo(db.User, { foreignKey: "userEmail", targetKey: "email" });
  };
  return Payment;
};
