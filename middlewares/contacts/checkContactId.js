const { readContacts } = require("../../helpers");

const checkContactId = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contacts = await readContacts();

    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      return res.status(404).json({ message: "Not found" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkContactId;
