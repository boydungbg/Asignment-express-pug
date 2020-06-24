const path = require("path");
const fs = require("fs");

var pathImage;
module.exports.viewListProduct = (req, res) => {
  res.render("admin/product/index", {
    title: "Admin Cozastore - List Products",
  });
};
module.exports.addProductGet = (req, res) => {
  res.render("admin/product/add-product", {
    title: "Admin Cozastore - Add Product",
  });
};
module.exports.addProductValid = (req, res, next) => {
  console.log(req.body);
  res.render("admin/product/add-product", {
    title: "Admin Cozastore - List Products",
    isValid: "is-invalid",
    errMessageName: "Name must me string",
  });
  //   next();
};
module.exports.uploadFile = (req, res, next) => {
  pathImage = [];
  let errNumber = 0;
  for (let i = 0; i < req.files.length; i++) {
    const targetPath = path.join(
      __dirname,
      "../../public/images/product/" + req.files[i].originalname
    );
    // console.log(targetPath);
    // console.log(req.files[i].path);
    if (
      path.extname(req.files[i].originalname).toLowerCase() === ".png" ||
      path.extname(req.files[i].originalname).toLowerCase() === ".jpg" ||
      path.extname(req.files[i].originalname).toLowerCase() === ".jpeg"
    ) {
      pathImage.push(targetPath);
      fs.rename(req.files[i].path, targetPath, (err) => {
        if (err) {
          errNumber = 1;
          console.log("dcm");
        }
      });
      if (errNumber === 1) {
        break;
      }
    } else {
      fs.unlink(req.files[i].path, (err) => {
        if (errNumber) {
          errNumber = 2;
        }
      });
      if (errNumber === 2) {
        break;
      }
    }
  }
  if (errNumber === 1) {
    return res.render("admin/product/add-product", {
      isValid: "",
      errMessageFile: "Can not upload file",
    });
  } else if (errNumber === 2) {
    return res.render("admin/product/add-product", {
      isValid: "asdfasdf",
      errMessage: "File must be image and .png, .jpg and .jpeg",
    });
  } else {
    next();
  }
};

module.exports.addProductDB = (req, res) => {
  res.redirect("/admin/product");
  //   console.log("dungdepzai");
};
