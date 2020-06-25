var userService = require("../services/user.js");
var { body, validationResult } = require("express-validator");

module.exports.registerGet = (req, res) => {
  res.render("cozastore/register", {
    title: "Register",
  });
};

module.exports.registerPost = (req, res) => {
  userService.insert(req.body);
  res.redirect("/cozastore/login");
};
