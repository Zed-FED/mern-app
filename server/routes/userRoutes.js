const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.post("/users", userController.addUser);
router.get("/users/:id", userController.getSingleUser);
router.get("/users", userController.getAllUsers);
router.put("/users/edit/:id", userController.editUser);
router.delete("/users/:id", userController.deleteUser);

router.post("/login", userController.loginUser);

module.exports = router;
