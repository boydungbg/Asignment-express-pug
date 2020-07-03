var mongoose = require("./db.js");
const { Schema } = require("mongoose");
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Must be string"],
    },
    fname: {
      type: String,
      required: [true, "Must be string"],
    },
    lname: {
      type: String,
      required: [true, "Must be string"],
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Must be string"],
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    shopingCart: [
      {
        productId: {
          type: String,
          require: [true, "Must be string"],
        },
        quantity: {
          type: Number,
          require: [true, "Must be number "],
        },
        color: {
          type: String,
          require: [true, "Must be string "],
        },
        size: {
          type: String,
          require: [true, "Must be string "],
        },
      },
    ],
    loveProduct: [
      {
        product_Id: {
          type: String,
          require: [true, "Must be string"],
        },
      },
    ],
    dateCreate: {
      type: String,
      required: [true, "Must be string"],
    },
    isAccuracy: {
      type: Number,
      default: 0,
    },
    isUser: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

UserSchema.index({ email: 1, _id: 1 });
module.exports = mongoose.model("User", UserSchema);
