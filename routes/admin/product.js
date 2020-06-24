var express = require("express");
const multer = require("multer");

var router = express.Router();
var productController = require("../../controllers/admin/product.js");

const upload = multer({
  dest: "C:/Users/luvso/Project/ASM/public/images/product/",
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
