const Brand = require("../models/brand.model");
const { syncBrand } = require("../utils/rdfHelper");

const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: "Không tìm thấy thương hiệu" });
        }
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const createBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const newBrand = await Brand.create({ name });
        await syncBrand(newBrand);
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).json({ message: "Không tìm thấy thương hiệu" });
        }

        await brand.update({ name });
        await syncBrand(brand);
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res.status(404).json({ message: "Không tìm thấy thương hiệu" });
        }

        await brand.destroy();
        res.status(200).json({ message: "Xóa thương hiệu thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
};
