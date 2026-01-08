const BlogCategory = require("../models/blogCategory.model");
const { syncBlogCategory } = require("../utils/rdfHelper");

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const slug = name.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const newCategory = await BlogCategory.create({
            name,
            slug,
            description
        });

        // Sync to RDF
        await syncBlogCategory(newCategory);

        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error creating blog category:", error);
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching blog categories:", error);
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await BlogCategory.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await BlogCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const slug = name.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        await category.update({ name, slug, description });

        // Sync to RDF
        await syncBlogCategory(category);

        res.status(200).json(category);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
};
