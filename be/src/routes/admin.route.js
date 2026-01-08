const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/admin.controller");

// In a real app, you should add verifyAdmin middleware here
router.get("/stats", getAdminStats);

module.exports = router;
