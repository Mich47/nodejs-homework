const express = require("express");
const {
  addContactValidator,
  updateContactValidator,
  checkContactId,
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

router.get("/:contactId", checkContactId, getContactById);

router.post("/", addContactValidator, addContact);

router.delete("/:contactId", checkContactId, removeContact);

router.put(
  "/:contactId",
  checkContactId,
  updateContactValidator,
  updateContact
);

module.exports = router;
