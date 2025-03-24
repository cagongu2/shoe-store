const ProductStock = require("../models/productStock.model");
const Product = require("../models/product.model");
const Color = require("../models/color.model");
const Size = require("../models/size.model");

const getAllProductStocks = async (req, res) => {
    try {
        const stocks = await ProductStock.findAll({
            include: [
                { model: Product, as: "product" },
                { model: Color, as: "color" },
                { model: Size, as: "size" },
            ],
        });
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const getProductStockById = async (req, res) => {
    try {
        const stock = await ProductStock.findByPk(req.params.id, {
            include: [
                { model: Product, as: "product" },
                { model: Color, as: "color" },
                { model: Size, as: "size" },
            ],
        });

        if (!stock) {
            return res.status(404).json({ message: "Không tìm thấy stock" });
        }

        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const createProductStock = async (req, res) => {
    try {
        const { productId, colorId, sizeId, quantity } = req.body;
        const newStock = await ProductStock.create({ productId, colorId, sizeId, quantity });
        res.status(201).json(newStock);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const updateProductStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, colorId, sizeId, quantity } = req.body;

        const stock = await ProductStock.findByPk(id);
        if (!stock) {
            return res.status(404).json({ message: "Không tìm thấy stock" });
        }

        await stock.update({ productId, colorId, sizeId, quantity });
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const deleteProductStock = async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await ProductStock.findByPk(id);

        if (!stock) {
            return res.status(404).json({ message: "Không tìm thấy stock" });
        }

        await stock.destroy();
        res.status(200).json({ message: "Xóa stock thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

module.exports = {
    getAllProductStocks,
    getProductStockById,
    createProductStock,
    updateProductStock,
    deleteProductStock,
};
