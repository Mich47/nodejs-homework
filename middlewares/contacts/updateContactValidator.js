const Joi = require("joi");
const { checkValidationErrorMessage, AppError } = require("../../helpers");

const updateContactValidator = (req, _, next) => {
  if (!Object.keys(req.body).length) {
    return next(new AppError(400, "missing fields"));
  }

  const { name, email, phone } = req.body;

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

  const { error } = schema.validate({ name, email, phone });

  if (!error) return next();

  const message = checkValidationErrorMessage(error);

  next(new AppError(400, message));
};

module.exports = updateContactValidator;
