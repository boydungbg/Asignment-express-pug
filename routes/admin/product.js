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
  productController.uploadFile,
  productController.saveProductDB
);

router.get("/update-product/:_id", productController.updateProduct);

router.post(
  "/update-product/:_id",
  upload.array("image", 12),
  productController.uploadFileUpdate,
  productController.saveProductUpdate
);

router.get("/update-product-status/:_id/", productController.updateStatus);

router.get("/open-modal-update/:id", productController.openModalChangeStatus);

module.exports = router;
