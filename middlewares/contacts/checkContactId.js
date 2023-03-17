const { asyncWrapper } = require("../../helpers");

const checkContactId = asyncWrapper(async (req, res, next) => {
  // const { contactId } = req.params;
  // const contacts = await readContacts();
  // const index = contacts.findIndex(({ id }) => id === contactId);
  // if (index === -1) {
  //   return next(new AppError(404, "Not found"));
  // }
  // next();
});

module.exports = checkContactId;
