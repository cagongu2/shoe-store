const express = require("express");
const router = express.Router();
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require("../controllers/blog.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");

router.post("/", verifyAdminToken, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", verifyAdminToken, updateBlog);
router.delete("/:id", verifyAdminToken, deleteBlog);

module.exports = router;
