const express = require("express");
const {
  addContactValidator,
  updateContactValidator,
  // checkContactId,
} = require("../../middlewares");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContactValidator, addContact);

router.delete("/:contactId", removeContact);

router.put(
  "/:contactId",
  // checkContactId,
  updateContactValidator,
  updateContact
);

module.exports = router;
