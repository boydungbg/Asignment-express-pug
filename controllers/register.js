var userService = require("../services/user.js");

module.exports.registerGet = (req, res) => {
  res.render("cozastore/register", {
    title: "Register",
  });
};

module.exports.registerPost = async (req, res) => {
  var user = await userService
    .insert(req.body)
    .then((data) => data)
    .catch((err) => console.log(err));
  // console.log(user);
  if (user == null) {
    res.render("cozastore/register", {
      title: "Register",
      valueUser: req.body,
    });
    return;
  }
  res.redirect("/cozastore/login");
};
