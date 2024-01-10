// import packeges
const express = require("express");
const router = express.Router();

//importig Controllers
const { login, signup, activateAccount } = require("../controllers/auth");

// importing Middlewares69*
const {} = require("../middlewares/general");

router.post("/login", login);
router.post("/signup", signup);
router.get("/activate-account/:token", activateAccount);

module.exports = router;
