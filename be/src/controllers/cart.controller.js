const Brand = require("../models/brand.model");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Image = require("../models/image.model");


exports.createCartItem = async (req, res) => {
    try {
        const { product_id, name, price, size, color, quantity, brand, userId } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Vui lòng đăng nhập để thêm vào giỏ hàng." });
        }

        let cartItem = await Cart.findOne({ where: { userId, productId: product_id, size, color, isPayed: false } });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({
                productId: product_id,
                name,
                price,
                size,
                color,
                quantity,
                brandId: brand.id,
                userId: userId,
                isPayed: false,
            });
        }

        res.status(201).json({
            message: "Cart item added successfully!",
            cartItem
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add cart item" });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.findAll({
            include: [
                {
                    model: Product,
                    as: "product",
                    include: [{ model: Image, as: "images" }]
                },

                { model: Brand, as: "brand" },
                { model: Order, as: "order" }
            ]
        });

        const formattedCartItems = cartItems.map(item => ({
            id:item.id,
            product_id: item.product.id,
            name: item.name,
            price: item.price,
            brand: {
                id: item.brand.id,
                name: item.brand.name
            },
            size: item.size,
            quantity: item.quantity,
            color: item.color,
            images: item.product.images
        }));

        res.status(200).json(formattedCartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve cart items" });
    }
};

exports.getCartItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await Cart.findByPk(id, {
            include: [
                { model: Product, as: "product" },
                { model: Brand, as: "brand" },
                { model: Order, as: "order" }
            ]
        });

        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        const formattedCartItem = {
            product_id: cartItem.product.id,
            name: cartItem.name,
            price: cartItem.price,
            brand: {
                id: cartItem.brand.id,
                name: cartItem.brand.name
            },
            size: cartItem.size,
            quantity: cartItem.quantity,
            color: cartItem.color,
            images: cartItem.product.images
        };

        res.status(200).json(formattedCartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve cart item" });
    }
};

exports.getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const cartItems = await Cart.findAll({
            where: { userId: userId },
            include: [
                {
                    model: Product,
                    as: "product",
                    include: [{ model: Image, as: "images" }]
                },

                { model: Brand, as: "brand" },
                { model: Order, as: "order" }
            ]
        });

        if (!cartItems.length) {
            return res.status(404).json({ message: "Giỏ hàng trống" });
        }

        const formattedCartItems = cartItems.map(item => ({
            id:item.id,
            product_id: item.product.id,
            name: item.name,
            price: item.price,
            brand: {
                id: item.brand.id,
                name: item.brand.name
            },
            size: item.size,
            quantity: item.quantity,
            color: item.color,
            images: item.product.images
        }));

        res.status(200).json(formattedCartItems);
    } catch (error) {
        console.error("Lỗi lấy giỏ hàng theo user_id:", error);
        res.status(500).json({ message: "Không thể lấy giỏ hàng" });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { size, color, quantity } = req.body;

        const cartItem = await Cart.findByPk(id);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        cartItem.size = size;
        cartItem.color = color;
        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({
            message: "Cart item updated successfully!",
            cartItem
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update cart item" });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await Cart.findByPk(id);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        await cartItem.destroy();
        res.status(200).json({ message: "Cart item deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete cart item" });
    }
};