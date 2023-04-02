const path = require("path");
const fse = require("fs-extra");
const fs = require("fs").promises;
const uuid = require("uuid").v4;
const { jwtToken } = require("../helpers");
const Jimp = require("jimp");
const { User } = require("../models");
const { constants } = require("fs/promises");

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
 *  {
  fieldname: 'avatar',
  originalname: 'DSC_4312 copy.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'C:\\Users\\Mich\\Documents\\GitHub\\nodejs-homework\\tmp',
  filename: 'avatar-1680467929320-335922387.jpg',
  path: 'C:\\Users\\Mich\\Documents\\GitHub\\nodejs-homework\\tmp\\avatar-1680467929320-335922387.jpg',
  size: 492117
}
 */
const updateUserAvatar = async (id, file) => {
  const newAvatarName = uuid();

  const relativePath = path.join(
    "public",
    "avatars",
    `${id}`,
    `${newAvatarName}.jpg`
  );

  const absolutePath = path.join(process.cwd(), relativePath);

  const jimp = await Jimp.read(file.path);
  jimp
    .cover(250, 250) // resize
    .quality(90) // set JPEG quality
    .write(absolutePath); // save

  const currentUser = await User.findByIdAndUpdate(id, {
    avatarURL: relativePath,
  }).select("-password -__v");

  const { avatarURL } = currentUser;

  if (!avatarURL.startsWith("http")) {
    try {
      await fs.unlink(path.join(process.cwd(), avatarURL));
    } catch (error) {
      console.log("Error: ", error.message);
    }
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
