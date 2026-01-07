const Blog = require("../models/blog.model");
const BlogCategory = require("../models/blogCategory.model");
const { Op } = require("sequelize");

const createBlog = async (req, res) => {
    try {
        const { title, image, description, content, categoryId, author, tags } = req.body;
        const newBlog = await Blog.create({
            title,
            image,
            description,
            content,
            categoryId,
            author,
            tags
        });

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

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByPk(id, {
            include: [{ model: BlogCategory, as: 'category' }]
        });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

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
        const { title, image, description, content, categoryId, author, tags } = req.body;

        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        await blog.update({
            title, image, description, content, categoryId, author, tags
        });

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
        const blog = await Blog.findByPk(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
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
