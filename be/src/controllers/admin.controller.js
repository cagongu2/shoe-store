const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const { Op } = require("sequelize");

const getAdminStats = async (req, res) => {
    try {
        // 1. Total Revenue (sum of totalPrice from all orders)
        const totalRevenueResult = await Order.sum('totalPrice');
        const totalRevenue = totalRevenueResult || 0;

        // 2. New Orders (orders from the last 24 hours or just count all pending if preferred)
        // Let's count orders created in the last 7 days as "recent" for a more dynamic feel
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const newOrders = await Order.count({
            where: {
                createdAt: {
                    [Op.gte]: sevenDaysAgo
                }
            }
        });

        // 3. Total Users
        const totalUsers = await User.count();

        // 4. Total Products (including hidden ones)
        const totalProducts = await Product.count();

        // 5. Recent Activity / Trending (Optional - but good for premium feel)
        const recentOrders = await Order.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            totalRevenue,
            newOrders,
            totalUsers,
            totalProducts,
            recentOrders
        });
    } catch (error) {
        console.error("Error getting admin stats:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports = {
    getAdminStats
};
