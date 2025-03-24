const Size = require("../models/size.model");

const getAllSizes = async (req, res) => {
    try {
        const sizes = await Size.findAll();
        res.status(200).json(sizes);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const getSizeById = async (req, res) => {
    try {
        const size = await Size.findByPk(req.params.id);
        if (!size) {
            return res.status(404).json({ message: "Không tìm thấy kích thước" });
        }
        res.status(200).json(size);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const createSize = async (req, res) => {
    try {
        const { name } = req.body;
        const newSize = await Size.create({ name });
        res.status(201).json(newSize);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const updateSize = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const size = await Size.findByPk(id);
        if (!size) {
            return res.status(404).json({ message: "Không tìm thấy kích thước" });
        }

        await size.update({ name });
        res.status(200).json(size);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const deleteSize = async (req, res) => {
    try {
        const { id } = req.params;
        const size = await Size.findByPk(id);

        if (!size) {
            return res.status(404).json({ message: "Không tìm thấy kích thước" });
        }

        await size.destroy();
        res.status(200).json({ message: "Xóa kích thước thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

module.exports = {
    getAllSizes,
    getSizeById,
    createSize,
    updateSize,
    deleteSize
};
