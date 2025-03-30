const express = require("express");
const { createPayment } = require("../controllers/momo.controller"); 
const router = express.Router();
router.post("/create-payment", createPayment);

module.exports = router;