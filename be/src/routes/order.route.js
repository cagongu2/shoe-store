const express = require("express");
const router = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/order.controler")

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/email/:email", getOrdersByEmail);
router.patch("/:id/status", updateOrderStatus); // PATCH for partial update
router.delete("/:id", deleteOrder);

module.exports = router;