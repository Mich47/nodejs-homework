const Joi = require("joi");

const updateContactValidator = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }

  const { name, email, phone } = req.body;
  let error = null;

  if (name && !error) {
    const schema = Joi.object({
      name: Joi.string().pattern(new RegExp("^[a-zA-Z .'-]+$")).min(3).max(60),
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
      phone: Joi.string().pattern(
        new RegExp(
          "^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{0,4}[-.\\s]?\\d{0,9}$"
        )
      ),
    });

    error = schema.validate({ phone }).error;
  }

  if (!error) return next();

  const message = error.details[0].message;

  res.status(400).json({ message });
};

module.exports = updateContactValidator;
