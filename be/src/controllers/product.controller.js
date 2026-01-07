const Product = require("../models/product.model");
const Brand = require("../models/brand.model");
const Category = require("../models/category.model");
const Image = require("../models/image.model");
const ProductStock = require("../models/productStock.model");
const Color = require("../models/color.model");
const Size = require("../models/size.model");

const getAllProducts = async (req, res) => {
    try {
        const { all } = req.query;
        // If "all" query param is present and true (e.g. from admin), show everything.
        // Otherwise, filter where isDeleted is false or null.
        const whereClause = (all === 'true') ? {} : { isDeleted: false };

        const products = await Product.findAll({
            where: whereClause,
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
        const { name, link, price, hot, sale, description, brandId, categoryId, stocks } = req.body;

        const imageLinks = req.files.map(file => `uploads/demo/${file.filename}`);

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

        await Promise.all(
            imageLinks.map(link => Image.create({ productId: newProduct.id, link }))
        );

        if (stocks) {
            const stockList = JSON.parse(stocks);
            await Promise.all(
                stockList.map(stock =>
                    ProductStock.create({
                        productId: newProduct.id,
                        colorId: stock.colorId,
                        sizeId: stock.sizeId,
                        quantity: stock.quantity,
                    })
                )
            );
        }

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

const toggleProductStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        await product.update({ isDeleted: !product.isDeleted });
        res.status(200).json({
            message: product.isDeleted ? "Đã ẩn sản phẩm" : "Đã kích hoạt sản phẩm",
            product
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const permanentlyDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const fs = require('fs');
        const path = require('path');

        const product = await Product.findByPk(id, {
            include: [{ model: Image, as: "images" }]
        });

        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        // Delete associated images from filesystem
        if (product.images && product.images.length > 0) {
            for (const image of product.images) {
                const imagePath = path.join(__dirname, '../../src/assets', image.link);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        }

        // Delete product (CASCADE will delete related records)
        await product.destroy();
        res.status(200).json({ message: "Xóa sản phẩm vĩnh viễn thành công" });
    } catch (error) {
        console.error("Error permanently deleting product:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    toggleProductStatus,
    permanentlyDeleteProduct
};
