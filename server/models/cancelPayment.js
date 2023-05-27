module.exports = (sequelize, DataTypes) => {
  const CancelPayment = sequelize.define(
    "CancelPayment",
    {
      // 이메일
      userEmail: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // PaymentData 내역
      paymentData: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      // 주문ID
      paymentId: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      // 주문 일자
      paymentDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // 환불/교환/취소
      cancelType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      // 회수 송장번호
      collectedDeliveryId: {
        type: DataTypes.INTEGER(50),
        allowNull: true,
        defaultValue: 0,
      },
      // 진행 단계
      processStep: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      //모든 단계 완료 여부
      clearStep: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "CancelPayment",
      tableName: "CancelPayments",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  CancelPayment.associate = (db) => {
    db.CancelPayment.belongsTo(db.User, { foreignKey: "userEmail", targetKey: "email" });
  };
  return CancelPayment;
};
