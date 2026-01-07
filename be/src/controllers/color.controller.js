const Color = require("../models/color.model")

const getAllColors = async (req, res) => {
    try {
        const colors = await Color.findAll();
        res.status(200).json(colors);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const getColorById = async (req, res) => {
    try {
        const color = await Color.findByPk(req.params.id);
        if (!color) {
            return res.status(404).json({ message: "Không tìm thấy màu" });
        }
        res.status(200).json(color);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
}; const createColor = async (req, res) => {
    try {
        const { name, hex } = req.body;
        const newColor = await Color.create({ name, hex });
        res.status(201).json(newColor);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const updateColor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, hex } = req.body;

        const color = await Color.findByPk(id);
        if (!color) {
            return res.status(404).json({ message: "Không tìm thấy màu" });
        }

        await color.update({ name, hex });
        res.status(200).json(color);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const deleteColor = async (req, res) => {
    try {
        const { id } = req.params;
        const color = await Color.findByPk(id);

        if (!color) {
            return res.status(404).json({ message: "Không tìm thấy màu" });
        }

        await color.destroy();
        res.status(200).json({ message: "Xóa màu thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

module.exports = {
    getAllColors,
    getColorById,
    createColor,
    updateColor,
    deleteColor
};