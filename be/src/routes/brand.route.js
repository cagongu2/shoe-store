const express = require("express");
const {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
} = require("../controllers/brand.controller");

const router = express.Router();

router.get("/", getAllBrands);
router.get("/:id", getBrandById);
router.post("/", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
