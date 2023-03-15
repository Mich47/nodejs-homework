const Joi = require("joi");
const { checkValidationErrorMessage } = require("../../helpers");

const updateContactValidator = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }

  const { name, email, phone } = req.body;
  let error = null;

  if (name && !error) {
    const schema = Joi.object({
      name: Joi.string()
        .regex(/^[a-zA-Z .'-]+$/)
        .min(3)
        .max(60),
    });

    error = schema.validate({ name }).error;
  }

  if (email && !error) {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }),
    });

    error = schema.validate({ email }).error;
  }

  if (phone && !error) {
    const schema = Joi.object({
      phone: Joi.string().regex(
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{0,4}[-.\s]?\d{0,9}$/
      ),
    });

    error = schema.validate({ phone }).error;
  }

  if (!error) return next();

  const message = checkValidationErrorMessage(error);

  res.status(400).json({ message });
};

module.exports = updateContactValidator;
