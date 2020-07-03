var userService = require("../services/user.js");
var productService = require("../services/product.js");

module.exports.checkCartShoping = async (req, res, next) => {
  var total = 0;
  if (req.session._user) {
    if (req.signedCookies._cart) {
      req.body.carts = req.signedCookies._cart;
    } else {
      var user = await userService
        .findUserById(req.session._user)
        .then((data) => data)
        .catch((err) => console.log(err));
      req.body.carts = user.shopingCart;
      for (let i = 0; i < req.body.carts.length; i++) {
        req.body.carts[i].product = await productService
          .findProductById(req.body.carts[i].productId)
          .then((data) => data)
          .then((err) => err);
        // console.log(req.body.carts[i].product);
        total += req.body.carts[i].quantity * req.body.carts[i].product.price;
      }
    }
    res.locals.length = req.body.carts.length || 0;
    res.locals.total = total;
    res.locals.carts = req.body.carts;
  }
  next();
};
