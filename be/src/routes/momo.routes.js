const express = require("express");
const router = express.Router();
const { createPayment } = require("../controllers/momo.controller"); 

router.post("/create-payment", createPayment);

module.exports = router;