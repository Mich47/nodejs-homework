const express = require("express");
const ctrl = require("../../controllers");
const { contactValidators } = require("../../middlewares");

const router = express.Router();

router
  .get("/", ctrl.listContacts)
  .post("/", contactValidators.checkAddedContact, ctrl.addContact);

router
  .get("/:contactId", contactValidators.checkContactId, ctrl.getContactById)
  .delete("/:contactId", contactValidators.checkContactId, ctrl.removeContact)
  .put(
    "/:contactId",
    contactValidators.checkContactId,
    contactValidators.checkUpdatedContact,
    ctrl.updateContact
  );

router.patch(
  "/:contactId/favorite",
  contactValidators.checkContactId,
  contactValidators.checkUpdatedStatus,
  ctrl.updateStatusContact
);

module.exports = router;
