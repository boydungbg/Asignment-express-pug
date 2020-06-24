module.exports.index = function(req, res) {
    res.render("cozastore/index", { title: "Home Page" });
}
module.exports.homepage2 = function(req, res) {
    res.render("cozastore/index/homepage2", { title: "Home Page 2" });
}
module.exports.homepage3 = function(req, res) {
    res.render("cozastore/index/homepage3", { title: "Home Page 3" });
}