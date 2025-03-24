const express = require("express");
const {
    getAllColors,
    getColorById,
    createColor,
    updateColor,
    deleteColor
} = require("../controllers/color.controller");

const router = express.Router();

router.get("/", getAllColors);
router.get("/:id", getColorById);
router.post("/", createColor);
router.put("/:id", updateColor);
router.delete("/:id", deleteColor);

module.exports = router;
