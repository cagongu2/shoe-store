const Brand = require("./brand.model");
const Category = require("./category.model");
const Color = require("./color.model");
const Image = require("./image.model");
const Product = require("./product.model");
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

