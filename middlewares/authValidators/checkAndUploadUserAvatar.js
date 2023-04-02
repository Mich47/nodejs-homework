const { avatarService } = require("../../services");

const checkAndUploadUserAvatar = (req, res, next) => {
  try {
    const userAvatar = avatarService.uploadImage("avatar");

    //Запускаємо multer
    userAvatar(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = checkAndUploadUserAvatar;
