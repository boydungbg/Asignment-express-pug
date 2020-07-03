var productService = require("../../services/product");
module.exports.index = async function (req, res) {
  var products = await productService
    .findProductByStatus(0)
    .then((data) => data)
    .catch((err) => console.log(err));
  res.render("cozastore/index", { title: "Home Page", products });
};
module.exports.homepage2 = function (req, res) {
  res.render("cozastore/index/homepage2", { title: "Home Page 2" });
};
module.exports.homepage3 = function (req, res) {
  res.render("cozastore/index/homepage3", { title: "Home Page 3" });
};
