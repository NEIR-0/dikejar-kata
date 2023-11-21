"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GameResult.belongsTo(models.Player);
      GameResult.belongsTo(models.Game);
    }
  }
  GameResult.init(
    {
      GameId: DataTypes.INTEGER,
      WinnerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GameResult",
    }
  );
  return GameResult;
};
