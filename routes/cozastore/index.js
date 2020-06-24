var express = require("express");
var router = express.Router();
var indexController = require("../../controllers/cozastore/index.js")

/* GET home page. */
router.get("/", indexController.index);

router.get("/homepage2", indexController.homepage2);
router.get("/homepage3", indexController.homepage3);

module.exports = router;