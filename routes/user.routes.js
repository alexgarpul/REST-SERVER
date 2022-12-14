const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/user.controller");

const {
  isValidRole,
  emailExists,
  userByIdExists,
} = require("../helpers/db-validators");
// const { validateFields } = require("../middlewares/validate-fields");
// const validateJWT = require("../middlewares/validate-jwt");
// const isRole = require("../middlewares/validate-role");

const {validateFields, validateJWT, isRole} = require('../middlewares')

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post(
  "/",
  [
    check("email", "El correo  es requerido").not().isEmpty(),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailExists),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "la contraseña es requerida").not().isEmpty(),
    check("password", "la contraseña debe tener 6 caracteres o más").isLength({
      min: 6,
    }),
    // check("password", "La contaraseña no es fuerte").isStrongPassword()
    check("role", "El rol es requerido").not().isEmpty(),
    check("role").custom(isValidRole),
    validateFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(userByIdExists),
    validateFields,
  ],
  updateUser
);

router.delete(
  "/:id",
  [
    validateJWT,
    isRole("ADMIN_ROLE", "SALE_ROLE"),
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(userByIdExists),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
