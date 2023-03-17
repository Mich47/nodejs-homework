const { asyncWrapper } = require("../helpers");
const contactsOperations = require("../models/contacts");

const listContacts = asyncWrapper(async (_, res) => {
  const contacts = await contactsOperations.listContacts();

  res.status(200).json(contacts);
});

const getContactById = asyncWrapper(async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await contactsOperations.getContactById(contactId);

  res.status(200).json(contact);
});

const removeContact = asyncWrapper(async (req, res) => {
  const { contactId } = req.params;

  await contactsOperations.removeContact(contactId);

  res.status(200).json({ message: "contact deleted" });
});

const addContact = asyncWrapper(async (req, res) => {
  const { body } = req;

  const newContact = await contactsOperations.addContact(body);

  res.status(201).json(newContact);
});

const updateContact = asyncWrapper(async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const updatedContact = await contactsOperations.updateContact(
    contactId,
    body
  );

  res.status(200).json(updatedContact);
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
