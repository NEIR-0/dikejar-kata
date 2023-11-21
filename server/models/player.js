"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.hasMany(models.Games, { foreignKey: "GameMasterId", as: "gameMaster" });
      Player.hasMany(models.GamePlayer, { as: "players" });
      Player.hasOne(models.GameResult, { foreignKey: "WinnerId", as: "winner" });
    }
  }
  Player.init(
    {
      username: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Player",
    }
  );
  return Player;
};
