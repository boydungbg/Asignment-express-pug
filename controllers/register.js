module.exports.registerGet = (req, res) => {
    res.render("cozastore/register", {
        title: "Register",
    });
};

module.exports.registerPost = (req, res) => {
    console.log(req.body);
};