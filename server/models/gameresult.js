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
      GameResult.belongsTo(models.Player, {foreignKey: "WinnerId"});
      GameResult.belongsTo(models.Game);
    }
  }
  GameResult.init(
    {
      GameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Games",
          key: "id",
        },
        validate: {
          notNull: {
            msg: "Game ID is required",
          },
          notEmpty: {
            msg: "Game ID is required",
          },
        },
      },
      WinnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Players",
          key: "id",
        },
        validate: {
          notNull: {
            msg: "Winner ID is required",
          },
          notEmpty: {
            msg: "Winner ID is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "GameResult",
    }
  );
  return GameResult;
};
