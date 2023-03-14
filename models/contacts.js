const { setId, readContacts, writeContacts } = require("../helpers");
/**
 * Get all contacts
 * @returns Array of all contacts
 */
const listContacts = async () => {
  return await readContacts();
};

/**
 * Get contact by ID
 * @returns Object of contact
 */
const getContactById = async (contactId) => {
  const contacts = await readContacts();

  const [contact] = contacts.filter(({ id }) => id === contactId);

  return contact;
};

/**
 * Remove contact by ID
 */
const removeContact = async (contactId) => {
  const contacts = await readContacts();

  const index = contacts.findIndex(({ id }) => id === contactId);
  contacts.splice(index, 1);

  await writeContacts(contacts);
};

/**
 * Add new contact
 * @returns Object of added contact
 */
const addContact = async (body) => {
  const contacts = await readContacts();

  const newContact = { id: setId(contacts), ...body };
  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
};

/**
 * Update an existing contact
 * @returns Object of updated contact
 */
const updateContact = async (contactId, body) => {
  const contacts = await readContacts();

  const index = contacts.findIndex(({ id }) => id === contactId);
  const updatedContact = { ...contacts[index], ...body };
  contacts.splice(index, 1, updatedContact);

  await writeContacts(contacts);

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
