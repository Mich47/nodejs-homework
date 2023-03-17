const Contact = require("./contactModel");

/**
 * Get all contacts
 * @returns Array of all contacts
 */
const listContacts = async () => {
  return await Contact.find();
};

/**
 * Get contact by ID
 * @returns Object of contact
 */
const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

/**
 * Remove contact by ID
 */
const removeContact = async (contactId) => {
  await Contact.findByIdAndDelete(contactId);
};

/**
 * Add new contact
 * @returns Object of added contact
 */
const addContact = async (body) => {
  const newContact = await Contact.create(body);

  return newContact;
};

/**
 * Update an existing contact
 * @returns Object of updated contact
 */
const updateContact = async (contactId, body) => {
  const updatedContact = Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
