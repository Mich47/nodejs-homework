const Joi = require("joi");
const { getValidationErrorMessage, AppError } = require("../../helpers");

const checkAddedContact = (req, _, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z .'-]+$/)
      .min(3)
      .max(60)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string()
      .regex(
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{0,4}[-.\s]?\d{0,9}$/
      )
      .required(),
    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);

  if (!error) return next();

  const message = getValidationErrorMessage(error);

  next(new AppError(400, message));
};

module.exports = checkAddedContact;
