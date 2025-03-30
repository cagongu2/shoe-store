const User = require("../models/user.model");


const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "User đã tồn tại" });
        }

        const newUser = await User.create({ email, password, role: "user" });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo user", error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { email, username, photo } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User không tồn tại" });
        }

        await user.update({ username, photo });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật user", error });
    }
};

const getUser = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { email } = req.params;
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({ message: "Vai trò không hợp lệ" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        await user.update({ role });
        res.status(200).json({ message: "Cập nhật vai trò thành công", user });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};


module.exports = { createUser, updateUser, getUser, updateUserRole };
