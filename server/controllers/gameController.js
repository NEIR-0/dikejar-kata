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
        order: [["id", "asc"]],
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

      const createdGame = await Game.create({ title, language, GameMasterId: userId });
      await GamePlayer.create({
        GameId: createdGame.id,
        PlayerId: userId,
      });

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
        attributes: ["id", "status"],
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

      const selectedGamePlayer = await GamePlayer.findOne({
        where: {
          GameId: gameId,
          PlayerId: userId,
        },
      });

      if (status !== "waiting") {
        if (!selectedGamePlayer) throw { name: "notFound", message: "Game already started / ended" };
      }

      const players = selectedGame.players;

      if (!selectedGamePlayer) {
        if (players.length > 7) {
          throw { name: "forbidden", message: "Room full" };
        }

        await GamePlayer.create({
          GameId: gameId,
          PlayerId: userId,
        });
      }

      let data = await Game.findByPk(gameId, {
        attributes: ["id", "title", "language", "status", "GameMasterId"],
        include: {
          model: Player,
          as: "players",
          attributes: ["username", "id"],
        },
      });

      let isGameMaster = data.GameMasterId === userId;

      data = data.toJSON();

      data.players = data.players.map(({ username, id }) => {
        return {id, username}
      });
      data.isGameMaster = isGameMaster;

      return res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async startGame(req, res, next) {
    try {
      const { gameId } = req.params;
      const { userId } = req;

      if (!gameId) {
        throw { name: "notFound", message: "Game not found" };
      }

      const selectedGame = await Game.findByPk(gameId, {
        attributes: ["id", "GameMasterId", "status", "language", "title"],
        include: {
          model: Player,
          as: "players",
          attributes: ["username"],
        },
      });

      if (!selectedGame) {
        throw { name: "notFound", message: "Game not found" };
      }

      const playerIndex = selectedGame.players.findIndex((player) => {
        return player.GamePlayer.PlayerId == userId;
      });

      if (playerIndex === -1) {
        throw { name: "unauthorized", message: "Not registered" };
      }

      if (selectedGame.GameMasterId != userId) {
        throw { name: "forbidden", message: "You are not the game master" };
      }

      if (selectedGame.status !== "waiting") {
        throw { name: "notFound", message: "Game already started / ended" };
      }

      await selectedGame.update({ status: "playing" });

      const data = selectedGame.toJSON();
      data.players = data.players.map(({ username }) => username);

      return res.status(200).json({ data: data });
    } catch (error) {
      return next(error);
    }
  }
};
