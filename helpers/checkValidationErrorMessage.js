/**
 * Check Joi.ValidationError
 * @param {*} error - Joi.ValidationError
 * @returns Error message
 */
const checkValidationErrorMessage = (error) => {
  let { message } = error.details[0];

  if (error.details[0].type === "any.required") {
    message = `missing required "${error.details[0].context.key}" field`;
  }

  if (error.details[0].type === "string.pattern.base") {
    switch (error.details[0].context.key) {
      case "name":
        message = "Name may contain only letters, apostrophe, dash and spaces";
        break;

      case "phone":
        message =
          "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +";
        break;
    }
  }

  return message;
};

module.exports = checkValidationErrorMessage;
