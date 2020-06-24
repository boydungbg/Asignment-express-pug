module.exports.loginGet = (req, res) => {
    res.render("cozastore/login", {
        title: "Login",
    })
};

module.exports.loginPost = (req, res) => {
    console.log(req.body);
};