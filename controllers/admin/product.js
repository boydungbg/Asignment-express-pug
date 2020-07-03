var path = require("path");
var fs = require("fs");
var productService = require("../../services/product.js");
const { listIndexes } = require("../../models/user.js");
var pathImage;
let updated = "";
let notifycationUpdate = "";

module.exports.viewListProduct = async (req, res) => {
  if (updated != "") {
    var updatedProduct = await productService
      .findProductById(updated)
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  var ListProduct = await productService
    .findAllProduct()
    .then((data) => data)
    .catch((err) => console.log(err));
  res.render("admin/product/index", {
    title: "Admin Cozastore - Management Products",
    products: ListProduct,
    updatedProduct: updated ? updatedProduct : "",
    notifycation: notifycationUpdate,
  });
  updated = "";
};

module.exports.openModalChangeStatus = async (req, res) => {
  console.log(req.params);
  var ListProduct = await productService
    .findAllProduct()
    .then((data) => data)
    .catch((err) => console.log(err));
  var product = await productService.findProductById(req.params.id).lean();
  res.render("admin/product/index", {
    title: "Admin Cozastore - Management Products",
    product: product,
    products: ListProduct,
  });
};

module.exports.addProductGet = (req, res) => {
  res.render("admin/product/add-product", {
    title: "Admin Cozastore - Add Product",
  });
};
module.exports.uploadFile = (req, res, next) => {
  pathImage = [];
  let errNumber = 0;
  for (let i = 0; i < req.files.length; i++) {
    const targetPath = path.join(
      __dirname,
      "../../public/images/product/" + req.files[i].originalname
    );
    if (
      path.extname(req.files[i].originalname).toLowerCase() === ".png" ||
      path.extname(req.files[i].originalname).toLowerCase() === ".jpg" ||
      path.extname(req.files[i].originalname).toLowerCase() === ".jpeg"
    ) {
      pathImage.push("/images/product/" + req.files[i].originalname);
      req.body.pathImage = pathImage;
      fs.rename(req.files[i].path, targetPath, (err) => {
        if (err) {
          errNumber = 1;
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
    res.render("admin/product/add-product", {
      title: "Admin Cozastore - Add Product",
      isValid: "is-invalid",
      errMessageFile: "Can not upload file",
      productValue: req.body,
    });
    return;
  } else if (errNumber === 2) {
    res.render("admin/product/add-product", {
      title: "Admin Cozastore - Add Product",
      isValid: "is-invalid",
      errMessageFile: "File must be image and .png, .jpg and .jpeg",
      productValue: req.body,
    });
    return;
  } else {
    next();
  }
};

module.exports.saveProductDB = async (req, res) => {
  req.body.color = req.body.color.split(",");
  // console.log(req.body.color);
  // if (req.body.color.indexOf()) {
  //   console.log("dcm");
  //   req.body.color.splice(req.body.color.indexOf(null), 1);
  // }
  // console.log(req.body.color);
  req.body.color = req.body.color.map((color) => {
    return color[0].toUpperCase() + color.slice(1);
  });
  req.body.size = req.body.size.toUpperCase();
  req.body.size = req.body.size.split(",");
  var added = await productService
    .insert(req.body)
    .then((res) => res)
    .catch((err) => console.log(err));
  updated = added._id;
  notifycationUpdate = {
    title: `Add product ${added ? "successfully" : "failed"}`,
    conten: `You have ${added ? "successfully" : "failed"} added the product ${
      req.body.name
    }`,
  };
  res.redirect("/admin/product");
};

module.exports.updateProduct = async (req, res) => {
  // console.log(req.params);
  var product = await productService
    .findProductById(req.params._id)
    .then((data) => data)
    .catch((err) => console.log(err));
  product.sizeString = product.size.join(", ");
  product.colorString = product.color.join(", ");
  res.render("admin/product/update-product", {
    title: "Admin Cozastore - Update Product",
    valueProduct: product,
  });
};

module.exports.uploadFileUpdate = async (req, res, next) => {
  var product = await productService
    .findProductById(req.params._id)
    .then((data) => data)
    .catch((err) => console.log(err));
  var pathImage = [];
  let errNumber = 0;
  if (product) {
    if (req.files.length == 0) {
      req.body.pathImage = product.image;
    } else {
      for (let i = 0; i < req.files.length; i++) {
        const targetPath = path.join(
          __dirname,
          "../../public/images/product/" + req.files[i].originalname
        );
        if (
          path.extname(req.files[i].originalname).toLowerCase() === ".png" ||
          path.extname(req.files[i].originalname).toLowerCase() === ".jpg" ||
          path.extname(req.files[i].originalname).toLowerCase() === ".jpeg"
        ) {
          pathImage.push("/images/product/" + req.files[i].originalname);
          fs.rename(req.files[i].path, targetPath, (err) => {
            if (err) {
              errNumber = 1;
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
      req.body.pathImage = pathImage;
    }
  }
  if (errNumber === 1) {
    res.render("admin/product/update-product", {
      title: "Admin Cozastore - Update Product",
      isValid: "is-invalid",
      errMessageFile: "Can not upload file",
      productValue: req.body,
    });
    return;
  } else if (errNumber === 2) {
    res.render("admin/product/update-product", {
      title: "Admin Cozastore - Update Product",
      isValid: "is-invalid",
      errMessageFile: "File must be image and .png, .jpg and .jpeg",
      productValue: req.body,
    });
    return;
  } else {
    next();
  }
};

module.exports.saveProductUpdate = async (req, res) => {
  req.body.color = req.body.color.split(",");
  // if (req.body.color.indexOf("")) {
  //   req.body.color.splice(req.body.color.indexOf(""), 1);
  // }
  req.body.color = req.body.color.map((color) => {
    return color[0].toUpperCase() + color.slice(1);
  });
  req.body.size = req.body.size.toUpperCase();
  req.body.size = req.body.size.split(",");
  var productCheckUpdate = await productService
    .updateProductById(req.params._id, req.body)
    .then((result) => result)
    .catch((err) => console.log(err));
  console.log(req.body);
  updated = req.params._id;
  notifycationUpdate = {
    title: `Update product ${productCheckUpdate ? "successfully" : "failed"}`,
    conten: `You have ${
      productCheckUpdate ? "successfully" : "failed"
    } updated the product ${req.body.name}`,
  };
  res.redirect("/admin/product");
};

module.exports.updateStatus = async (req, res) => {
  var product = await productService
    .findProductById(req.params._id)
    .then((data) => data)
    .catch((err) => console.log(err));
  if (product) {
    var isHidden = await productService.updateStatusProduct(
      req.params._id,
      product.status == 1 ? 0 : 1
    );
    updated = product._id;
    notifycationUpdate = {
      title: `Update status ${isHidden ? "successfully" : "failed"}`,
      conten: `You have ${
        isHidden ? "successfully" : "failed"
      } updated status ${
        product.status == 1 ? "Hidden" : "Visible"
      } the product ${product.name}`,
    };
    res.redirect("/admin/product");
    return;
  }
};
