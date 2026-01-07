const express = require('express');
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
} = require("../controllers/blogCategory.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");

router.post("/", verifyAdminToken, createCategory);
router.get("/", getAllCategories);
router.put("/:id", verifyAdminToken, updateCategory);
router.delete("/:id", verifyAdminToken, deleteCategory);

module.exports = router;
