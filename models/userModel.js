const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { enums } = require("../constants");
const { jwtToken } = require("../helpers");

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
  token: {
    type: String,
    default: null,
  },
});

/**
 * Auto password hashing
 */
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

/**
 * Auto token generating for new user
 */
userModel.post("validate", function (_, next) {
  if (this.token) return next();

  this.token = jwtToken.jwtTokenSign(this._id);

  next();
});

userModel.methods.comparePassword = (myPlaintextPassword, hash) =>
  bcrypt.compare(myPlaintextPassword, hash);

const User = model("users", userModel);

module.exports = User;
