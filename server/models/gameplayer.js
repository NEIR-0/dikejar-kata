"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GamePlayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GamePlayer.belongsTo(models.Player);
      GamePlayer.belongsTo(models.Game);
    }
  }
  GamePlayer.init(
    {
      PlayerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Players",
          key: "id"
        },
        validate: {
          notEmpty: {
            msg: "Player ID is required",
          },
          notNull: {
            msg: "Player ID is required",
          },
        },
      },
      GameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Games",
          key: "id"
        },
        validate: {
          notEmpty: {
            msg: "Player ID is required",
          },
          notNull: {
            msg: "Player ID is required",
          },
        },
      },
      isDefeated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: {
            msg: "Defeated indicator is required",
          },
          notNull: {
            msg: "Defeated indicator is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "GamePlayer",
    }
  );
  return GamePlayer;
};
