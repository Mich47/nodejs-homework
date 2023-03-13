const Joi = require("joi");

const addContactValidator = (req, res, next) => {
  const { name, email, phone } = req.body;
  const schema = Joi.object({
    name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"))
      .min(3)
      .max(60)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string()
      .pattern(
        new RegExp(
          "\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}"
        )
      )
      .required(),
  });

  const { error } = schema.validate({ name, email, phone });

  if (!error) return next();

  const message = error.details[0].message;
  console.log("message ", message);

  res.status(422).json({ message });
};

const updateContactValidator = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }

  const { name, email, phone } = req.body;
  console.log("req.body ", req.body);

  let error = null;

  if (name) {
    const schema = Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"))
      .min(3)
      .max(30);

    error = schema.validate(name).error;
    console.log("error12 ", error);
  }

  if (email) {
    // schema = Joi.string().email({ tlds: { allow: false } });
  }

  if (phone) {
    // schema = Joi.string().pattern(
    //   new RegExp(
    //     "\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}"
    //   )
    // );
  }

  //   const { error } = schema?.validate({ name, email, phone });
  //   console.log("error ", error);

  if (!error) return next();

  const message = error.details[0].message;
  console.log("message ", message);

  res.status(422).json({ message });
};

module.exports = {
  addContactValidator,
  updateContactValidator,
};
