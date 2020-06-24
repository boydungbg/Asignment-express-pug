var express = require("express");
var router = express.Router();
var aboutController = require("../../controllers/cozastore/about.js")

router.get("/", aboutController.aboutViewList);
module.exports = router;