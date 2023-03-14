const contactsOperations = require("../models/contacts");

const listContacts = async (_, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const contact = await contactsOperations.getContactById(contactId);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    await contactsOperations.removeContact(contactId);

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { body } = req;

  try {
    const newContact = await contactsOperations.addContact(body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;

  try {
    const updatedContact = await contactsOperations.updateContact(
      contactId,
      body
    );

    res.status(200).json(updatedContact);
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
