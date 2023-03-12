const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  res.json(await getContactById(id));
});

router.post("/", async (req, res, next) => {
  res.status(201).json(await addContact(req.body));
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  res.status(200).json(await removeContact(id));
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  res.json(await updateContact(id, req.body));
});

module.exports = router;
