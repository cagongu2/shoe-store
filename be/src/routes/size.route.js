const express = require("express");
const {
  getAllSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
} = require("../controllers/size.controler");

const router = express.Router();

router.get("/", getAllSizes);

router.get("/:id", getSizeById);

router.post("/", createSize);

router.put("/:id", updateSize);

router.delete("/:id", deleteSize);

module.exports = router;
