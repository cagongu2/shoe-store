const express = require("express");
const {
    createUser, updateUser, getUser, updateUserRole
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
            res.status(404).send({ message: "Admin not found!" })
        }
        if (admin.password !== password) {
            res.status(401).send({ message: "Invalid password!" })
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
                email: admin.email,
                role: admin.role
            }
        })

    } catch (error) {
        console.error("Failed to login as admin", error)
        res.status(401).send({ message: "Failed to login as admin" })
    }
})

router.get("/:email", getUser);
router.post("/", createUser);
// router.put("/", updateUser);
router.put("/:email/role", updateUserRole);

module.exports = router;