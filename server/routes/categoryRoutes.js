const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categoryController");

router.post("/categories", categoryController.addCategory);
router.get("/categories/:id", categoryController.getSingleCategory);
router.get("/categories", categoryController.getAllCategories);
router.put("/categories/:id", categoryController.editCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

module.exports = router;
