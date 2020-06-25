var express = require("express");
var router = express.Router();
var userService = require("../services/user.js");

module.exports.authentication = async (req, res, next) => {
  var user = await userService
    .findUserById(req.signedCookies._user)
    .then((data) => data)
    .catch((err) => console.log(err));
  if (user == null) {
    res.redirect("/cozastore/login");
    return;
  }
  res.locals.user = user;
  next();
};
