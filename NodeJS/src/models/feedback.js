"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FeedBack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FeedBack.init(
    {
      productID: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      contentFeedBack: DataTypes.TEXT,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "FeedBack",
    }
  );
  return FeedBack;
};
