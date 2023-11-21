const { Game, GamePlayer, Player } = require("../models");

module.exports = class GameController {
  static async getGames(req, res, next) {
    try {
      const games = await Game.findAll({
        where: { status: "waiting" },
        attributes: ["id", "language", "title"],
        include: {
          model: Player,
          attributes: ["username"],
          as: "gameMaster",
        },
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

  static async getGame(req, res, next) {
    try {
      const { gameId } = req.params;
      const { userId } = req;

      if (!gameId) {
        throw { name: "notFound", message: "Game not found" };
      }

      const selectedGame = await Game.findByPk(gameId, {
        attributes: ["id", "title", "language", "status"],
        include: {
          model: Player,
          as: "players",
          attributes: ["username"],
        },
      });

      if (!selectedGame) {
        throw { name: "notFound", message: "Game not found" };
      }

      const status = selectedGame.status;

      const selectedGamePlayer = GamePlayer.findOne({
        where: {
          GameId: gameId,
          PlayerId: userId,
        },
      });

      if (status !== "waiting" && !selectedGamePlayer) {
        throw { name: "notFound", message: "Game already started / ended" };
      }

      if (!selectedGamePlayer) {
        await GamePlayer.create({
          GameId: gameId,
          PlayerId: userId,
        });
      }

      const data = selectedGame.toJSON();
      data.players = data.players.map(({ username }) => username);

      return res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
};
