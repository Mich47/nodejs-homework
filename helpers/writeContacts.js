const fs = require("fs").promises;
const path = require("path");

const writeContacts = async (contacts) => {
  await fs.writeFile(
    path.join(__dirname, "../models/contacts.json"),
    JSON.stringify(contacts),
    "utf8"
  );
};

module.exports = writeContacts;
