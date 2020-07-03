var express = require("express");
var router = express.Router();
var productController = require("../../controllers/cozastore/product.js");

router.get("/", productController.viewListProduct);

router.get("/product-detail/:_id", productController.viewProductDetail);

module.exports = router;
