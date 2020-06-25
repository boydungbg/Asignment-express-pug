var express = require("express");
const multer = require("multer");
var path = require("path");

var router = express.Router();
var productController = require("../../controllers/admin/product.js");

var pathImage = path.join(__dirname, "../../public/images/product/");

const upload = multer({
  dest: pathImage,
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.get("/", productController.viewListProduct);

router.get("/add-product", productController.addProductGet);
router.post(
  "/add-product",
  upload.array("image", 12),
  productController.addProductValid,
  productController.uploadFile,
  productController.addProductDB
);

module.exports = router;
