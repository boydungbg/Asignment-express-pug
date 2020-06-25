var userService = require("../services/user.js");

module.exports.loginGet = (req, res) => {
  res.render("cozastore/login", {
    title: "Login",
  });
};

module.exports.loginPost = async (req, res) => {
  var user = await userService
    .findUserByEmail(req.body.email)
    .then((result) => result)
    .catch((err) => console.log(err));
  console.log(user);
  if (user == null) {
    res.render("cozastore/login", {
      title: "Login",
      err: "email or password wrong",
    });
    return;
  } else {
    if (user.password === req.body.password) {
      if (req.body.remember === "on") {
        res.cookie("_user", user._id, { signed: true });
      }
      if (user.email === "luvsosad2412@gmail.com") {
        res.redirect("/admin/index");
      } else {
        res.redirect("/cozastore/index");
      }
      return;
    }
  }
};

module.exports.logOut = (req, res) => {
  res.clearCookie("_user");
  req.session.destroy();
  res.redirect("/cozastore/login");
};
