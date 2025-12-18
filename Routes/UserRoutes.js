const express = require("express");
const userController = require("../Controllers/UserController");
const { protect } = require("../Middleware/AuthMiddleware.js");

const router = express.Router();

router.use(protect);

router.route("/")
    .get(userController.getAllUsers);

router.route("/:id")
    .get(userController.getUser)
    .delete(userController.deleteUser);

module.exports = router;