const express = require("express");
const {
    createUser,
    loginUser,
    updateUser,
    getUser,
    updateUserRole,
    getAllUsers,
    deleteUser
} = require("../controllers/user.controller");
const router = express.Router();

// Define routes
router.post("/register", createUser); // Explicit register route
router.post("/login", loginUser);     // Explicit login route
router.post("/admin", loginUser);     // Keep admin route for backward compatibility, mapped to same login logic

router.get("/", getAllUsers);         // Get all users
router.get("/:email", getUser);       // Get user by Email
router.post("/", createUser);         // Keep root post for create/register if needed
router.put("/:email", updateUser);    // Update user profile
router.put("/:email/role", updateUserRole); // Update role
router.delete("/:id", deleteUser);    // Delete user by ID

module.exports = router;