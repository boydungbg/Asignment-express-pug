var express = require("express");
var router = express.Router();
var shopingCartController = require("../../controllers/cozastore/shoping-cart.js");

router.get("/", shopingCartController.shopingCartGet);

router.post("/add-to-cart", shopingCartController.addtocart);

module.exports = router;
