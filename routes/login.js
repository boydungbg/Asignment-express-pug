var express = require("express");
const { render } = require("pug");
var router = express.Router();
var loginController = require("../controllers/login.js")

router.get("/login", loginController.loginGet);

router.post("/login", loginController.loginPost);

module.exports = router;