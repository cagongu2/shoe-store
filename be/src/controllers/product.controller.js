const Product = require("../models/product.model");
const Brand = require("../models/brand.model");
const Category = require("../models/category.model");
const Image = require("../models/image.model");
const ProductStock = require("../models/productStock.model");
const Color = require("../models/color.model");
const Size = require("../models/size.model");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Brand, as: "brand" },
                { model: Category, as: "category" },
                { model: Image, as: "images" },
                {
                    model: ProductStock,
                    as: "stocks",
                    include: [
                        { model: Color, as: "color" },
                        { model: Size, as: "size" }
                    ]
                }
            ]
        });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                { model: Brand, as: "brand" },
                { model: Category, as: "category" },
                { model: ProductStock, as: "stock" },
                {
                    model: ProductStock,
                    as: "stocks",
                    include: [
                        { model: Color, as: "color" },
                        { model: Size, as: "size" }
                    ]
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, link, price, hot, sale, description, brandId, categoryId } = req.body;

        const newProduct = await Product.create({
            name,
            link,
            price,
            hot,
            sale,
            description,
            brandId,
            categoryId
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, link, price, hot, sale, description, brandId, categoryId } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        await product.update({ name, link, price, hot, sale, description, brandId, categoryId });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        await product.destroy();
        res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
