const Address = require("./address.model");
const Brand = require("./brand.model");
const Cart = require("./cart.model");
const Category = require("./category.model");
const Color = require("./color.model");
const Image = require("./image.model");
const Order = require("./order.model");
const Product = require("./product.model");
const User = require("./user.model");

const ProductStock = require("./productStock.model");
const Size = require("./size.model");

Product.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Product.hasMany(Image, { foreignKey: "productId", as: "images" });
Product.hasMany(ProductStock, { foreignKey: "productId", as: "stocks" });

Image.belongsTo(Product, { foreignKey: "productId", as: "product" });

ProductStock.belongsTo(Product, { foreignKey: "productId", as: "product" });
ProductStock.belongsTo(Color, { foreignKey: "colorId", as: "color" });
ProductStock.belongsTo(Size, { foreignKey: "sizeId", as: "size" });

Color.hasMany(ProductStock, { foreignKey: "colorId", as: "stocks" });
Size.hasMany(ProductStock, { foreignKey: "sizeId", as: "stocks" });

Cart.belongsTo(Product, { foreignKey: "productId", as: "product" });
Cart.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });
Cart.belongsTo(Order, { foreignKey: "orderId", as: "order" });


Order.belongsTo(Address, { foreignKey: "addressId", as: "address" });
Order.hasMany(Cart, { foreignKey: "orderId", as: "carts" })

const Blog = require("./blog.model");
const BlogCategory = require("./blogCategory.model");

Blog.belongsTo(BlogCategory, { foreignKey: "categoryId", as: "category" });
BlogCategory.hasMany(Blog, { foreignKey: "categoryId", as: "blogs" });

module.exports = {
    Address,
    Brand,
    Cart,
    Category,
    Color,
    Image,
    Order,
    Product,
    User,
    ProductStock,
    Size,
    Blog,
    BlogCategory
};