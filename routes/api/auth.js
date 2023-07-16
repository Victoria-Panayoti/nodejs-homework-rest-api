const express = require("express");
const ctrl = require("../../controllers/user");
const {validateBody} = require("../../middlewares");
const { schemas } = require("../../models/users");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login",validateBody(schemas.loginSchema),ctrl.login)

module.exports = router;