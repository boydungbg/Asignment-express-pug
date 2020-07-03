const productService = require("../../services/product.js");

module.exports.viewListProduct = async function (req, res) {
  var products = await productService
    .findProductByStatus(0)
    .then((data) => data)
    .catch((err) => console.log(err));
  res.render("cozastore/product/index", { title: "Product", products });
};
module.exports.viewProductDetail = async (req, res) => {
  var _product = await productService
    .findProductById(req.params._id)
    .then((data) => data)
    .catch((err) => console.log(err));
  console.log(_product);
  res.render("cozastore/product/product-detail", {
    title: "Product-detail",
    product: _product,
  });
};
