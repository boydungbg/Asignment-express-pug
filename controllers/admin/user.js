var userService = require("../../services/user.js");

module.exports.managementUser = async (req, res) => {
  var ListUsers = await userService
    .findUserByIsUser(0)
    .catch((data) => data)
    .catch((err) => console.log(err));
  res.render("admin/user", {
    title: "Admin Cozastore - Managerment Users",
    listUsers: ListUsers,
  });
};
