var express = require("express");
var router = express.Router();
var blogController = require("../../controllers/cozastore/blog.js")

router.get("/", blogController.blogViewList);

module.exports = router;