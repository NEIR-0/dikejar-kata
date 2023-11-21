const { verifyToken } = require("../helper/jwt");

function mustLogin(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "unauthorized", message: "Please sign in" };
    }

    const [authType, token] = authorization.split(" ");

    if (authType !== "Bearer") {
      throw { name: "unauthorized", message: "Invalid token" };
    }

    const { id: userId } = verifyToken(token);

    req.userId = userId;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { mustLogin };
