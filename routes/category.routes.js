const { Router } = require("express");
const { check } = require("express-validator");
const {
  createCategory,
  getCategories,
} = require("../controllers/category.controlle");
const { validateJWT } = require("../middlewares");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get("/", getCategories);
router.get("/:id");
router.post(
  "/",
  [
    validateJWT,
    
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

router.put("/:id");
router.delete("/:id");

module.exports = router;
