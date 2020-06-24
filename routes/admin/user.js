var express = require("express");
var router = express.Router();
var userController = require("../../controllers/admin/user.js");

router.get("/", userController.managementUser);

module.exports = router;