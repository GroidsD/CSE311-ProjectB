"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bill.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Bill.hasMany(models.Bill_Item, {
        foreignKey: "billId",
        as: "bill_items",
      });
    }
  }
  Bill.init(
    {
      billId: DataTypes.STRING,

      userId: DataTypes.STRING,
      totalPrice: DataTypes.DOUBLE,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
