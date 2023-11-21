function errorHandlers(error, req, res, next) {
  switch (error.name) {
    case "unauthorized":
      return res.status(401).json({ message: error.message });
    default:
      return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { errorHandlers };
