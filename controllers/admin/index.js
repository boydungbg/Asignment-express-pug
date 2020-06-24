module.exports.index = (req, res) => {
  res.render("admin/index/index", {
    title: "Admin Cozastore - Dashboard",
  });
};
