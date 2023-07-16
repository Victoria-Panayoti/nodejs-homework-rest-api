const express = require("express");
const ctrl = require("../../controllers/contacts");
const {isValidId,validateBody, authenticate} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/",authenticate ,ctrl.getAll);

router.get("/:id",authenticate ,isValidId, ctrl.getById);

router.post("/",authenticate,validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id",authenticate ,isValidId, ctrl.deleteById);

router.patch("/:id", authenticate,isValidId, ctrl.updateById);

router.patch("/:id/favorite",authenticate, isValidId, ctrl.updateStatusContact);

module.exports = router;
