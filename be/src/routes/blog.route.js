const express = require("express");
const router = express.Router();
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require("../controllers/blog.controller");
const upload = require("../middleware/upload");
const verifyAdminToken = require("../middleware/verifyAdminToken");


router.post("/", verifyAdminToken, upload.single("image"), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", verifyAdminToken, upload.single("image"), updateBlog);
router.delete("/:id", verifyAdminToken, deleteBlog);

module.exports = router;
