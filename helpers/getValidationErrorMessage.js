/**
 * Check Joi.ValidationError
 * @param {*} error - Joi.ValidationError
 * @returns Error message
 */
const getValidationErrorMessage = (error) => {
  const {
    type,
    context: { key },
  } = error.details[0];

  const isRequiredStatus = type === "any.required" && key === "favorite";
  if (isRequiredStatus) {
    return `missing field "${key}"`;
  }

  const isRequired = type === "any.required";
  if (isRequired) {
    return `missing required "${key}" field`;
  }

  let { message } = error.details[0];

  if (type === "string.pattern.base") {
    switch (key) {
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

module.exports = getValidationErrorMessage;
