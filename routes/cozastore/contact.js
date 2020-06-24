var express = require("express");
var router = express.Router();
var contactController = require("../../controllers/cozastore/contact.js")

router.get("/", contactController.contactGet);
module.exports = router;