var mongosse = require("./db.js");

var Schema = mongosse.Schema;

var UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Invalid email"],
    },
    fname: {
      type: String,
      required: [true, "Invalid first name"],
    },
    lname: {
      type: String,
      required: [true, "Invalid last name"],
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Invalid password"],
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    shoppingCart: [
      {
        product_Id: {
          type: String,
          require: [true, "Must be product id"],
        },
        quatity: {
          type: Number,
          require: [true, "Must be number "],
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
  },
  { versionKey: false }
);

UserSchema.index({ email: 1 });
module.exports = mongosse.model("User", UserSchema);
