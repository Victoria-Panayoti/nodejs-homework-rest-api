const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const {notFoundHandler} = require("./middlewares");

const authRouter = require("./routes/api/auth")
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
  next();
});

app.use("/api/users", authRouter)
app.use("/api/contacts", contactsRouter);

app.use(notFoundHandler);

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Server error" } = err;
  res.status(statusCode).json({ message });
});

module.exports = app;
