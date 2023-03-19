const Joi = require("joi");
const { getValidationErrorMessage, AppError } = require("../../helpers");

const checkUpdatedContact = (req, _, next) => {
  const { body } = req;

  if (!Object.keys(body).length) {
    return next(new AppError(400, "missing fields"));
  }

  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z .'-]+$/)
      .min(3)
      .max(60),
    email: Joi.string().email({ tlds: { allow: false } }),
    phone: Joi.string().regex(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{0,4}[-.\s]?\d{0,9}$/
    ),
  });

  const { error } = schema.validate(body);

  if (!error) return next();

  const message = getValidationErrorMessage(error);

  next(new AppError(400, message));
};

module.exports = checkUpdatedContact;
