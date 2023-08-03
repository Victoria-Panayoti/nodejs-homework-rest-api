const express = require("express");
const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts");
const { isValidId, validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(schemas.addSchema), add);

router.delete("/:id", authenticate, isValidId, deleteById);

router.patch("/:id", authenticate, isValidId, updateById);

router.patch("/:id/favorite", authenticate, isValidId, updateStatusContact);

module.exports = router;
