const Joi = require("joi");

const addContactValidator = (req, res, next) => {
  const { name, email, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z .'-]+$"))
      .min(3)
      .max(60)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string()
      .pattern(
        new RegExp(
          "^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{0,4}[-.\\s]?\\d{0,9}$"
        )
      )
      .required(),
  });

  const { error } = schema.validate({ name, email, phone });

  if (!error) return next();

  const message = error.details[0].message;

  res.status(422).json({ message });
};

module.exports = addContactValidator;
