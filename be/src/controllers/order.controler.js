const { Op } = require("sequelize");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const { syncOrder } = require("../utils/rdfHelper");

const createOrder = async (req, res) => {
    try {
        const { name, email, phone, address, carts, totalPrice } = req.body;

        let existingAddress = await Address.findOne({
            where: {
                city: address.city,
                country: address.country,
                state: address.state,
                zipcode: address.zipcode,
            },
        });
        if (!existingAddress) {
            existingAddress = await Address.create(address);
        }
        const newOrder = await Order.create({
            name,
            email,
            phone,
            totalPrice,
            addressId: existingAddress.id,
            status: "pending"
        });

        // Get cart items with product IDs for RDF sync
        const cartItems = await Cart.findAll({
            where: { id: { [Op.in]: carts } }
        });

        await Cart.update(
            { orderId: newOrder.id, isPayed: true },
            { where: { id: { [Op.in]: carts } } }
        );

        // Sync order to RDF
        await syncOrder(newOrder, cartItems);

        res.status(201).json({
            message: "Đơn hàng đã được tạo thành công!",
            order: newOrder,
        });
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                { model: Address, as: 'address' }
            ]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

const getOrdersByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.findAll({
            where: { email },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Lỗi khi lấy đơn hàng của user:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }

        await order.update({ status });
        res.status(200).json({ message: "Cập nhật trạng thái thành công", order });
    } catch (error) {
        console.error("Lỗi khi cập nhật đơn hàng:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
        await order.destroy();
        res.status(200).json({ message: "Xóa đơn hàng thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa đơn hàng:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
    updateOrderStatus,
    deleteOrder
}
