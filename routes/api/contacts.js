const express = require("express");
const {
  addContactValidator,
  updateContactValidator,
} = require("../../middlewares");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContactValidator, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContactValidator, updateContact);

module.exports = router;
