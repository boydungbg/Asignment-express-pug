const userService = require("../../services/user.js");

module.exports.shopingCartGet = function (req, res) {
  res.render("cozastore/shoping-cart/index", { title: "Shoping Cart" });
};
module.exports.addtocart = async function (req, res) {
  var user = await userService
    .findUserById(req.session._user)
    .then((data) => data)
    .catch((err) => console.log(err));
  console.log(req.body);
  console.log(user);
  var cart = {
    productId: req.body.id,
    quantity: req.body.quantity,
    color: req.body.color,
    size: req.body.size,
  };
  if (user) {
    var carts = user.shopingCart;
    carts.push(cart);
    var added = await userService
      .addToCart(user._id, carts)
      .then((data) => data)
      .catch((err) => console.log(err));
    if (added) {
      res.cookie("_cart", added, {
        signed: true,
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });
    }
  }
  return;
};
