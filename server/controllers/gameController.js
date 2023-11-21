const { Game } = require("../models");

module.exports = class GameController {
  static async getGames(req, res, next) {
    try {
      const games = await Game.findAll({
        where: { status: "waiting" },
      });

      return res.status(200).json({ games });
    } catch (error) {
      return next(error);
    }
  }

  static async createGame(req, res, next) {
    try {
      const { title, language } = req.body;

      const { userId } = req;

      await Game.create({ title, language, GameMasterId: userId });

      return res.status(200).json({ message: "OK" });
    } catch (error) {
      return next(error);
    }
  }
};
