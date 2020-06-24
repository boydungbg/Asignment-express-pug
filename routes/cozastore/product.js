var express = require("express");
var router = express.Router();
var productController = require("../../controllers/cozastore/product.js");

router.get("/", productController.viewListProduct);

module.exports = router;