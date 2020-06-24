var express = require("express");
var router = express.Router();
var shopingCartController = require("../../controllers/cozastore/shoping-cart.js")

router.get("/", shopingCartController.shopingCartGet);
module.exports = router;