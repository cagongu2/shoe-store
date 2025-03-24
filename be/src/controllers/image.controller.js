const Image = require("../models/image.model");

const getAllImages = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const getImageById = async (req, res) => {
    try {
        const image = await Image.findByPk(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Không tìm thấy ảnh" });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const createImage = async (req, res) => {
    try {
        const { link } = req.body;
        const newImage = await Image.create({ link });
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { link } = req.body;

        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: "Không tìm thấy ảnh" });
        }

        await image.update({ link });
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id);

        if (!image) {
            return res.status(404).json({ message: "Không tìm thấy ảnh" });
        }

        await image.destroy();
        res.status(200).json({ message: "Xóa ảnh thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

module.exports = {
    getAllImages,
    getImageById,
    createImage,
    updateImage,
    deleteImage
};
