const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY || "your_jwt_secret_key"; // Fallback or env

const createUser = async (req, res) => {
    try {
        const { email, password, username, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "User đã tồn tại" });
        }

        const newUser = await User.create({ email, password, username, role: role || "user" });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo user", error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Simple password check (plaintext as per existing code)
        // In production, use bcrypt!
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                photo: user.photo,
                phone: user.phone,
                address: user.address
            }
        });
    } catch (error) {
        console.error("Login failed", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { email } = req.params;
        const { username, photo, role } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User không tồn tại" });
        }

        await user.update({ username, photo, role });

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

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        await user.destroy();
        res.status(200).json({ message: "Xóa người dùng thành công" });
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


module.exports = {
    createUser,
    loginUser,
    updateUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUserRole
};
