const Category = require("../models/category.model");
const { syncCategory } = require("../utils/rdfHelper");

const getAllCategories = async (req, res) => {
    try {
        const { tree } = req.query;
        let categories;
        if (tree === 'true') {
            categories = await Category.findAll({
                where: { parentId: null },
                include: [{ model: Category, as: 'children', include: [{ model: Category, as: 'children' }] }]
            });
        } else {
            categories = await Category.findAll();
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, parentId } = req.body;
        const newCategory = await Category.create({ name, parentId });
        await syncCategory(newCategory);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, parentId } = req.body;
        // turbo
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        await category.update({ name, parentId });
        await syncCategory(category);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        await category.destroy();
        res.status(200).json({ message: "Xóa danh mục thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
