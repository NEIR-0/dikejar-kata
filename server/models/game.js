"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.hasMany(models.GamePlayer);
      Game.hasOne(models.GameResult);
    }
  }
  Game.init(
    {
      title: DataTypes.STRING,
      language: DataTypes.STRING,
      status: DataTypes.STRING,
      GameMasterId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
