const { Op } = require("sequelize");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

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
        });

        await Cart.update(
            { orderId: newOrder.id, isPayed: true },
            { where: { id: { [Op.in]: carts } } }
        );
        
        res.status(201).json({
            message: "Đơn hàng đã được tạo thành công!",
            order: newOrder,
        });
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports = {
    createOrder
}

