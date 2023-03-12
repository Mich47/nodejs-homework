const fs = require("fs").promises;
const { constants } = require("buffer");
const path = require("path");

const listContacts = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "./contacts.json"),
      "utf8"
    );

    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {}
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "./contacts.json"),
      "utf8"
    );

    const contacts = JSON.parse(data);

    const [contact] = contacts.filter(({ id }) => id === contactId);

    return contact;
  } catch (error) {}
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "./contacts.json"),
      "utf8"
    );

    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(({ id }) => id !== contactId);

    await fs.writeFile(
      path.join(__dirname, "./contacts.json"),
      JSON.stringify(updatedContacts),
      "utf8"
    );

    return { message: "contact deleted" };
  } catch (error) {}
};

const addContact = async (body) => {
  console.log("body ", body);
  try {
    const data = await fs.readFile(
      path.join(__dirname, "./contacts.json"),
      "utf8"
    );

    const contacts = JSON.parse(data);
    const newContact = { id: setId(contacts), ...body };
    contacts.push(newContact);

    await fs.writeFile(
      path.join(__dirname, "./contacts.json"),
      JSON.stringify(contacts),
      "utf8"
    );

    return newContact;
  } catch (error) {}
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "./contacts.json"),
      "utf8"
    );

    const contacts = JSON.parse(data);
    const index = contacts.findIndex(({ id }) => id === contactId);

    const updatedContact = { ...contacts[index], ...body };

    contacts.splice(index, 1, updatedContact);

    await fs.writeFile(
      path.join(__dirname, "./contacts.json"),
      JSON.stringify(contacts),
      "utf8"
    );

    return updatedContact;
  } catch (error) {}
};

function setId(contacts) {
  const newId = contacts.reduce(
    (largeId, { id }) =>
      (largeId = largeId > Number(id) ? largeId : Number(id)),
    0
  );

  return (newId + 1).toString();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
