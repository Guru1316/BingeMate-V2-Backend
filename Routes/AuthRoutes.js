const express = require("express");
const { body } = require("express-validator");
const authController = require("../Controllers/AuthController");
const { protect } = require("../Middleware/AuthMiddleware");

const router = express.Router();

const registerValidation = [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 })
];

const loginValidation = [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty()
];

router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
router.get("/profile", protect, authController.getProfile);

module.exports = router;