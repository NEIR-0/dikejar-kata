const express = require("express");
const PlayerController = require("../controllers/playerController");
const router = express.Router();

router.post("/register", PlayerController.register);

module.exports = router;
