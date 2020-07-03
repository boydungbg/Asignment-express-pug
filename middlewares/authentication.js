var userService = require("../services/user.js");

module.exports.authentication = async (req, res, next) => {
  var user_id = req.signedCookies._user || req.session._user;
  var user = await userService
    .findUserById(user_id)
    .then((data) => data)
    .catch((err) => console.log(err));
  if (user == null) {
    res.redirect("/cozastore/login");
    return;
  }
  req.session._user = user._id;
  res.locals.user = user;
  console.log(user);
  next();
};
