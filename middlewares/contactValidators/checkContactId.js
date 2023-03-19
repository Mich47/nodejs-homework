const {
  Types: { ObjectId },
} = require("mongoose");
const { AppError } = require("../../helpers");
const Contact = require("../../models/contactModel");

const checkContactId = async (req, _, next) => {
  const { contactId } = req.params;

  try {
    const isValidId = ObjectId.isValid(contactId);
    if (!isValidId) {
      return next(new AppError(404, "Not found"));
    }

    const isExistsId = await Contact.exists({ _id: contactId });
    if (!isExistsId) {
      return next(new AppError(404, "Not found"));
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkContactId;
