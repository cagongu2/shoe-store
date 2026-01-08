const Blog = require("../models/blog.model");
const BlogCategory = require("../models/blogCategory.model");
const { Op } = require("sequelize");
const { syncBlog, logBlogView } = require("../utils/rdfHelper");

/**
 * @openapi
 * /api/v1/blogs:
 *   get:
 *     summary: Lấy danh sách bài viết
 */
const createBlog = async (req, res) => {
    try {
        const { title, description, content, categoryId, author, tags } = req.body;

        // Handle image upload
        let imagePath = req.body.image; // Fallback to URL if provided
        if (req.file) {
            imagePath = `uploads/demo/${req.file.filename}`;
        }

        const newBlog = await Blog.create({
            title,
            image: imagePath,
            description,
            content,
            categoryId,
            author,
            tags
        });

        // Sync to RDF
        await syncBlog(newBlog);

        // Fetch with category info
        const blogWithCategory = await Blog.findByPk(newBlog.id, {
            include: [{ model: BlogCategory, as: 'category' }]
        });

        res.status(201).json(blogWithCategory);
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Error creating blog", error: error.message });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const { categoryId, search } = req.query;
        let whereClause = {};

        if (categoryId) {
            whereClause.categoryId = categoryId;
        }

        if (search) {
            whereClause.title = { [Op.like]: `%${search}%` };
        }

        const blogs = await Blog.findAll({
            where: whereClause,
            include: [{ model: BlogCategory, as: 'category' }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};

/**
 * @openapi
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Chi tiết bài viết
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 */
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.query;
        const blog = await Blog.findByPk(id, {
            include: [{ model: BlogCategory, as: 'category' }]
        });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Log view to RDF
        logBlogView(email, id);

        // Increment view count
        blog.viewed += 1;
        await blog.save();

        res.status(200).json(blog);
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "Error fetching blog", error: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Update Blog ID:", id);
        console.log("Req Body:", req.body);
        console.log("Req File:", req.file);
        const { title, description, content, categoryId, author, tags } = req.body;

        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Handle image update
        let imagePath = blog.image;
        if (req.file) {
            imagePath = `uploads/demo/${req.file.filename}`;
        } else if (req.body.image) {
            imagePath = req.body.image;
        }

        await blog.update({
            title, image: imagePath, description, content, categoryId, author, tags
        });

        // Sync to RDF
        await syncBlog(blog);

        // Fetch updated blog with category
        const updatedBlog = await Blog.findByPk(id, {
            include: [{ model: BlogCategory, as: 'category' }]
        });

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Error updating blog", error: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const fs = require('fs');
        const path = require('path');

        const blog = await Blog.findByPk(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Delete associated image from filesystem if exists and is a local path
        if (blog.image && !blog.image.startsWith('http')) {
            const imagePath = path.join(__dirname, '../assets', blog.image);

            if (fs.existsSync(imagePath)) {
                try {
                    fs.unlinkSync(imagePath);
                } catch (err) { }
            }
        }

        await blog.destroy();
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
