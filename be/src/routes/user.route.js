const express = require("express");
const {
    createUser,
    updateUser,
    getUser,
    updateUserRole,
    getAllUsers,
    deleteUser
} = require("../controllers/user.controller");
const User = require("../models/user.model");
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY


router.post("/admin", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const admin = await User.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).send({ message: "Admin not found!" })
        }
        if (admin.password !== password) {
            return res.status(401).send({ message: "Invalid password!" })
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: admin.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                id: admin.id,
                email: admin.email,
                role: admin.role
            }
        })

    } catch (error) {
        console.error("Failed to login as admin", error)
        res.status(401).send({ message: "Failed to login as admin" })
    }
})

router.get("/", getAllUsers); // Get all users
router.get("/:email", getUser); // Get user by Email
router.post("/", createUser); // Add user // update logic to accept role if needed or separate endpoint? Controller handles it.
router.put("/:email", updateUser); // Update user profile
router.put("/:email/role", updateUserRole); // Update role specific route
router.delete("/:id", deleteUser); // Delete user by ID

module.exports = router;