const Joi = require("joi");
const { enums, joiRegex } = require("../../constants");
const { getValidationErrorMessage, AppError } = require("../../helpers");

const checkUserData = (req, _, next) => {
  const schema = Joi.object({
    password: Joi.string().regex(joiRegex.PASSWORD_REGEX).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    subscription: Joi.string().valid(...Object.values(enums.SUBSCRIPTION_ENUM)),
    token: Joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (!error) return next();

  const message = getValidationErrorMessage(error);

  next(new AppError(400, message));
};

module.exports = checkUserData;
