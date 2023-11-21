const { Game } = require("../models");

module.exports = class GameController {
  static async getGames(req, res, next) {
    try {
      const games = await Game.findAll({
        where: { status: "waiting" },
      });

      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  }
};
