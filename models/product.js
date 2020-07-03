var mongoose = require("./db.js");
const { Schema } = require("mongoose");
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var productSchema = new Schema(
  {
    name: {
      type: String,
      required: "Must be string",
    },
    price: {
      type: SchemaTypes.Double,
      required: "Must be decimal",
    },
    category: {
      type: String,
      require: "Must be string",
    },
    subcategory: {
      type: String,
      required: "Must be string",
    },
    introduce: {
      type: String,
      required: "Must be string",
    },
    description: {
      type: String,
      required: "Must be string",
    },
    weight: {
      type: SchemaTypes.Double,
      required: "Must be decimal",
    },
    dimensions: {
      chest: { type: Number, require: "Must be number" },
      length: { type: Number, require: "Must be number" },
      sleeve: { type: Number, require: "Must be number" },
    },
    materials: {
      type: SchemaTypes.Double,
      required: "Must be decimal",
    },
    color: {
      type: Array,
      required: "Must be array",
    },
    size: {
      type: Array,
      required: "Must be array",
    },
    image: {
      type: Array,
      required: "Must be array string path image",
    },
    timeCreate: {
      type: Number,
      default: Date.now(),
    },
    status: {
      type: Number,
      default: 0,
    },
    timeDelete: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

productSchema.index({ Name: 1, _id: 1 });
module.exports = mongoose.model("Product", productSchema);
