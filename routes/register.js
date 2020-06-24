var express = require("express");
const { render } = require("pug");
var router = express.Router();
var registerController = require("../controllers/register.js")

router.get("/register", registerController.registerGet);

router.post("/register", registerController.registerPost);

module.exports = router;