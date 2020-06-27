var userService = require("../services/user.js");
const user = require("../models/user.js");
var session = require("express-session");
var cookieParser = require("cookie-parser");

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
  if (user == null) {
    res.render("cozastore/login", {
      title: "Login",
      err: "email or password wrong",
    });
    return;
  } else {
    if (user.password === req.body.password) {
      session({
        secret: "sx",
        saveUninitialized: false,
        resave: false,
      });
      if (req.body.remember === "on") {
        cookieParser();
      }
    }
  }
};
