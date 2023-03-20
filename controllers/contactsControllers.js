const { asyncWrapper } = require("../helpers");
const contactsOperations = require("../models/contacts");

/**
 * Controller. Get array of all contacts and status
 */
const listContacts = asyncWrapper(async (_, res) => {
  const contacts = await contactsOperations.listContacts();

  res.status(200).json(contacts);
});

/**
 * Controller. Get contact by ID and status
 */
const getContactById = asyncWrapper(async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await contactsOperations.getContactById(contactId);

  res.status(200).json(contact);
});

/**
 * Controller. Remove contact by ID and return status
 */
const removeContact = asyncWrapper(async (req, res) => {
  const { contactId } = req.params;

  await contactsOperations.removeContact(contactId);

  res.status(200).json({ message: "contact deleted" });
});

/**
 * Controller. Add new contact, return status and Object of added contact
 */
const addContact = asyncWrapper(async (req, res) => {
  const { body } = req;

  const newContact = await contactsOperations.addContact(body);

  res.status(201).json(newContact);
});

/**
 * Controller. Update an existing contact, return status and Object of updated contact
 */
const updateContact = asyncWrapper(async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const updatedContact = await contactsOperations.updateContact(
    contactId,
    body
  );

  res.status(200).json(updatedContact);
});

/**
 * Controller. Update field "favorite" of an existing contact, return status and Object of updated contact
 */
const updateStatusContact = asyncWrapper(async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const updatedContact = await contactsOperations.updateStatusContact(
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
  updateStatusContact,
};
