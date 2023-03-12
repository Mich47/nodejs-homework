const fs = require("fs").promises;
const path = require("path");

const readContacts = async () => {
  const data = await fs.readFile(
    path.join(__dirname, "../models/contacts.json"),
    "utf8"
  );

  return JSON.parse(data);
};

module.exports = readContacts;
