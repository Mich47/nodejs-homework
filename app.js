const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
console.log("env", process.env.BD_URI);

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
});

module.exports = app;
