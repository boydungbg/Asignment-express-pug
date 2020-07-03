var userSchema = require("../models/user.js");
const user = require("../models/user.js");

module.exports.insert = (user) => {
  var userInsert = new userSchema({
    email: user.email,
    password: user.password,
    fname: user.firstname,
    lname: user.lastname,
    avatar: "avatar",
    dateCreate: Date.now(),
    isUser: user.isUser,
  });
  return userInsert.save();
};

module.exports.findUserByEmail = (_email) => {
  return userSchema.findOne({ email: _email });
};

module.exports.findUserById = (id) => {
  return userSchema.findOne({ _id: id });
};

module.exports.findUserByIsUser = (number) => {
  return userSchema.find({ isUser: 0 });
};

module.exports.addToCart = (_idUser, cart) => {
  var addedcart = userSchema.findOneAndUpdate(
    { _id: _idUser },
    {
      shopingCart: cart,
    }
  );
  return addedcart;
};
