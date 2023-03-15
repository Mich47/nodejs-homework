const Joi = require("joi");
const { checkValidationErrorMessage } = require("../../helpers");

const addContactValidator = (req, res, next) => {
  const { name, email, phone } = req.body;

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
  });

  const { error } = schema.validate({ name, email, phone });

  if (!error) return next();

  const message = checkValidationErrorMessage(error);

  res.status(400).json({ message });
};

module.exports = addContactValidator;
