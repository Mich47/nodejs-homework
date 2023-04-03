const path = require("path");
const uuid = require("uuid").v4;
const { jwtToken, fileOperations } = require("../helpers");
const Jimp = require("jimp");
const { User } = require("../models");

/**
 * Create new user
 * @returns Object of user data
 */
const signup = async ({ email, password }) => {
  const newUser = await User.create({ email, password });

  const { subscription, avatarURL } = newUser;

  return { email, subscription, avatarURL };
};

/**
 * Login user
 * @returns Object of user data and token
 */
const login = async (id) => {
  const { token, email, subscription, avatarURL } =
    await User.findByIdAndUpdate(
      id,
      {
        token: jwtToken.jwtTokenSign(id),
      },
      {
        new: true,
      }
    ).select("-password -__v");

  return {
    token,
    user: {
      email,
      subscription,
      avatarURL,
    },
  };
};

/**
 * Logout user
 */
const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

/**
 * Get current user data
 * @returns Object of user data
 */
const getUser = async (id) => {
  const currentUser = await User.findById(id).select("-password -__v");

  const { email, subscription, avatarURL } = currentUser;

  return { email, subscription, avatarURL };
};

/**
 * Update the subscription of the current user.
 * Must be one of ["starter", "pro", "business"]
 * @returns Object of updated user data
 */
const updateUserSubscription = async (id, newSubscription) => {
  const updatedUser = await User.findByIdAndUpdate(id, newSubscription, {
    new: true,
  }).select("-password -__v");

  const { email, subscription } = updatedUser;

  return { email, subscription };
};

/**
 * Update the avatar of the current user.
 * @returns Object of updated user's avatar
 */

const updateUserAvatar = async (id, file) => {
  const newAvatarName = `${uuid()}.jpg`;

  const absolutePath = fileOperations.getAbsolutePath(id, newAvatarName);

  const relativePath = path.relative(process.cwd(), absolutePath);

  const jimp = await Jimp.read(file.path);
  jimp
    .cover(250, 250) // resize
    .quality(90) // set JPEG quality
    .write(absolutePath); // save

  // delete temp file
  await fileOperations.deleteFile(file.path);

  const currentUser = await User.findByIdAndUpdate(id, {
    avatarURL: relativePath,
  }).select("-password -__v");

  const { avatarURL } = currentUser;

  // delete old avatar file
  if (!avatarURL.startsWith("http")) {
    await fileOperations.deleteFile(
      fileOperations.getAbsolutePath(id, avatarURL)
    );
  }

  return { avatarURL: relativePath };
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
  updateUserSubscription,
  updateUserAvatar,
};
