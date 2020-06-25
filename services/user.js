var userSchema = require("../models/user.js");
const { use } = require("../routes/login.js");

module.exports.insert = (user) => {
  var userInsert = new userSchema({
    email: user.email,
    password: user.password,
    fname: user.firstname,
    lname: user.lastname,
    avatar: "avatar",
    dateCreate: Date.now(),
  });
  return userInsert.save();
};

module.exports.findUserByEmail = (_email) => {
  return userSchema.findOne({ email: _email }, (err, res) => {
    if (err) {
      return err;
    } else {
      return res;
    }
  });
};

module.exports.findUserById = (id) => {
  return userSchema.findOne({ _id: id }, (err, res) => {
    if (err) {
      return err;
    } else {
      return res;
    }
  });
};

module.exports.findUserByIsUser = (number) => {
  return userSchema.find({ isUser: 0 }, (err, res) => {
    if (err) {
      return err;
    } else {
      return res;
    }
  });
};
