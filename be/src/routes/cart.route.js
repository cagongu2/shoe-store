const express = require("express");
const {
    createCartItem,
    getCartItems,
    getCartItemById,
    updateCartItem,
    deleteCartItem, getCartByUserId
} = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", getCartItems);
router.get("/:id", getCartItemById);
router.get("/user/:userId", getCartByUserId);
router.post("/", createCartItem);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router;
