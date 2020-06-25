var userSchema = require("../models/user.js");
const { use } = require("../routes/login.js");

module.exports.insert = (user) => {
  var userInsert = new userSchema({
    email: user.email,
    password: user.password,
    fname: user.firstname,
    lname: user.lastname,
    avatar: "avatar",
    dateCreate: "24/12/2000",
  });
  console.log(userInsert);
  userInsert.save((err, res) => {
    if (err) {
      return err;
    } else {
      return res;
    }
  });
};

module.exports.findUserByEmail = async (emailName) => {
  return userSchema.findOne({ email: emailName }, (err, res) => {
    if (err) {
      return err;
    } else {
      return res;
    }
  });
};
