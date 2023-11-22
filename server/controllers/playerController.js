const { createToken } = require("../helper/jwt");
const { Player } = require("../models");

module.exports = class PlayerController {
  static async register(req, res, next) {
    try {
      const { username } = req.body;

      const [player, _] = await Player.findOrCreate({
        where: { username },
        defaults: { username },
      });

      const access_token = createToken({ id: player.id });

      return res.status(200).json({ access_token, userId: player.id });
    } catch (error) {
      return next(error);
    }
  }
};
