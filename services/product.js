var productSchema = require("../models/product.js");
const { path, _router } = require("../app.js");
const product = require("../models/product.js");
const { stat } = require("fs");

module.exports.findAllProduct = () => {
  return productSchema.find();
};

module.exports.findProductById = (id) => {
  return productSchema.findOne({ _id: id });
};

module.exports.findProductByStatus = (_status) => {
  return productSchema.find({ status: _status });
};

module.exports.insert = (product) => {
  var productInsert = new productSchema({
    name: product.name,
    price: parseFloat(product.price),
    category: product.category,
    subcategory: product.subCategory,
    introduce: product.introduce,
    description: product.description,
    weight: parseFloat(product.weight),
    dimensions: {
      length: product.length,
      sleeve: product.sleeve,
      chest: product.chest,
    },
    materials: parseFloat(product.materials),
    color: product.color,
    size: product.size,
    image: product.pathImage,
  });
  return productInsert.save();
};

module.exports.updateProductById = (_id, _product) => {
  var productUpdate = productSchema.findOneAndUpdate(
    { _id: _id },
    {
      price: _product.price,
      introduce: _product.introduce,
      description: _product.description,
      weight: _product.weight,
      dimensions: {
        length: _product.length,
        sleeve: _product.sleeve,
        chest: _product.chest,
      },
      materials: _product.materials,
      color: _product.color,
      size: _product.size,
      image: _product.pathImage,
    }
  );
  return productUpdate
    .then((res) => true)
    .catch((err) => {
      return false;
    });
};
module.exports.updateStatusProduct = (_id, _status) => {
  var productUpdate = productSchema.findOneAndUpdate(
    { _id: _id },
    {
      status: _status,
    }
  );
  return productUpdate
    .then((res) => true)
    .catch((err) => {
      return false;
    });
};
