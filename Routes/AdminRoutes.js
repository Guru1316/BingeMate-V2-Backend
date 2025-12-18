const express = require("express");
const { getAdminStats } = require("../Controllers/AdminController");

const router = express.Router();

router.get("/stats", getAdminStats);

module.exports = router;