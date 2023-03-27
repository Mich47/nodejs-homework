const { jwtToken } = require("../helpers");
const { User } = require("../models");

const signup = async ({ email, password }) => {
  const newUser = await User.create({ email, password });

  const { subscription } = newUser;

  return { email, subscription };
};

const login = async (id) => {
  const { token, email, subscription } = await User.findByIdAndUpdate(
    id,
    {
      token: jwtToken.jwtTokenSign(id),
    },
    {
      new: true,
    }
  ).select("token email subscription");

  return {
    token,
    user: {
      email,
      subscription,
    },
  };
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const getUser = async (id) => {
  const currentUser = await User.findById(id).select("email subscription");

  const { email, subscription } = currentUser;

  return { email, subscription };
};

const updateUserSubscription = async (id, newSubscription) => {
  const updatedUser = await User.findByIdAndUpdate(id, newSubscription, {
    new: true,
  }).select("email subscription");

  const { email, subscription } = updatedUser;

  return { email, subscription };
};

module.exports = { signup, login, logout, getUser, updateUserSubscription };
