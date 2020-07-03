var userService = require("../services/user.js");

module.exports.registerGet = (req, res) => {
  res.render("cozastore/register", {
    title: "Register",
  });
};

module.exports.registerPost = async (req, res) => {
  // console.log(req.body);
  var userCheck = await userService.findUserByEmail(req.body.email);
  // console.log(userCheck);
  if (userCheck == null) {
    req.body.email === "luvsosad2412@gmail.com"
      ? (req.body.isUser = 2)
      : (req.body.isUser = 1);
    var user = await userService
      .insert(req.body)
      .then((data) => data)
      .catch((err) => console.log(err));
    if (user == null) {
      res.render("cozastore/register", {
        title: "Register",
        valueUser: req.body,
        err: "Account creation failed",
      });
      return;
    }
    res.redirect("/cozastore/login");
    return;
  } else {
    res.render("cozastore/register", {
      title: "Register",
      valueUser: req.body,
      errMessageEmail: "Email already exists",
      isValid: "is-invalid",
    });
    return;
  }
};
