const { setId, readContacts, writeContacts } = require("../helpers");

const listContacts = async (_, res, next) => {
  try {
    const contacts = await readContacts();

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const contacts = await readContacts();

    const [contact] = contacts.filter(({ id }) => id === contactId);

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contacts = await readContacts();

    const index = contacts.findIndex(({ id }) => id === contactId);
    contacts.splice(index, 1);

    await writeContacts(contacts);

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { body } = req;

  try {
    const contacts = await readContacts();

    const newContact = { id: setId(contacts), ...body };
    contacts.push(newContact);

    await writeContacts(contacts);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { body } = req;

    const { contactId } = req.params;

    const contacts = await readContacts();

    const index = contacts.findIndex(({ id }) => id === contactId);
    const updatedContact = { ...contacts[index], ...body };
    contacts.splice(index, 1, updatedContact);

    await writeContacts(contacts);

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
