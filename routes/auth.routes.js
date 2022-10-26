const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");

const { emailExists } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email  es requerido").not().isEmpty(),
    check("password", "El password es requerida").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
