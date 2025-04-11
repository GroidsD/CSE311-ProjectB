"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HistoryCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HistoryCart.init(
    {
      userID: DataTypes.INTEGER,
      productID: DataTypes.INTEGER,
      date: DataTypes.DATE,
      files: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "HistoryCart",
    }
  );
  return HistoryCart;
};
