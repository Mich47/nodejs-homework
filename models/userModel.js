const { Schema, model } = require("mongoose");
const { enums } = require("../constants");

const userModel = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: Object.values(enums.SUBSCRIPTION_ENUM),
    default: enums.SUBSCRIPTION_ENUM.STARTER,
  },
  token: String,
});

const User = model("users", userModel);

module.exports = User;
