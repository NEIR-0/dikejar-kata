const express = require("express");
const PlayerController = require("../controllers/playerController");
const { mustLogin } = require("../middlewares/authentication");
const { errorHandlers } = require("../middlewares/errorhandlers");
const router = express.Router();

router.post("/register", PlayerController.register);
router.use(errorHandlers);

module.exports = router;
