const express = require("express");
const { contactsCtrl } = require("../../controllers");
const { contactValidators } = require("../../middlewares");

const router = express.Router();

router
  .get("/", contactsCtrl.listContacts)
  .post("/", contactValidators.checkAddedContact, contactsCtrl.addContact);

router
  .get(
    "/:contactId",
    contactValidators.checkContactId,
    contactsCtrl.getContactById
  )
  .delete(
    "/:contactId",
    contactValidators.checkContactId,
    contactsCtrl.removeContact
  )
  .put(
    "/:contactId",
    contactValidators.checkContactId,
    contactValidators.checkUpdatedContact,
    contactsCtrl.updateContact
  );

router.patch(
  "/:contactId/favorite",
  contactValidators.checkContactId,
  contactValidators.checkUpdatedStatus,
  contactsCtrl.updateStatusContact
);

module.exports = router;
