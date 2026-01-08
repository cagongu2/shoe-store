const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { DataTypes } = require("sequelize");

require('dotenv').config()
require("./src/models/associations");
const sequelize = require("./src/utils/database");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

const productRoutes = require("./src/routes/product.route");
const brandRoutes = require("./src/routes/brand.route");
const categoryRoutes = require("./src/routes/category.route");
const colorRoutes = require("./src/routes/color.route");
const imageRoutes = require("./src/routes/image.route");
const sizeRoutes = require("./src/routes/size.route");
const stockRoutes = require("./src/routes/productStock.route");
const userRoutes = require("./src/routes/user.route");
const cartsRoutes = require("./src/routes/cart.route");
const momoRoutes = require("./src/routes/momo.routes")
const ordersRotes = require("./src/routes/order.route")
const blogRoutes = require("./src/routes/blog.route");



const blogCategoryRoutes = require("./src/routes/blogCategory.route");
const adminRoutes = require("./src/routes/admin.route");

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/colors", colorRoutes);
app.use("/api/v1/images", imageRoutes);
app.use("/api/v1/sizes", sizeRoutes);
app.use("/api/v1/stocks", stockRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/carts", cartsRoutes);
app.use("/api/v1/momo", momoRoutes);
app.use("/api/v1/orders", ordersRotes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/blog-categories", blogCategoryRoutes);
app.use("/api/v1/admin", adminRoutes);


// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "src/assets/uploads")));

sequelize.sync({ alter: true })
    .then(async () => {
        console.log("Database Synchronized!");

        // Seed Admin User
        const User = require("./src/models/user.model");
        try {
            const adminEmail = process.env.ADMIN_EMAIL || "admin@store.com";
            const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

            const admin = await User.findOne({ where: { role: "admin" } });
            if (!admin) {
                await User.create({
                    email: adminEmail,
                    password: adminPassword,
                    role: "admin",
                    username: "Admin",
                    photo: ""
                });
                console.log(`Admin account created: ${adminEmail} / ${adminPassword}`);
            } else {
                console.log("Admin account already exists.");
            }
        } catch (error) {
            console.error("Error seeding admin:", error);
        }

        // Seed Blog Categories
        const BlogCategory = require("./src/models/blogCategory.model");
        try {
            const categories = [
                { name: "Mẹo vặt", slug: "meo-vat", description: "Các mẹo vặt hữu ích" },
                { name: "Tin tức", slug: "tin-tuc", description: "Tin tức mới nhất" },
                { name: "Sự kiện", slug: "su-kien", description: "Các sự kiện nổi bật" }
            ];

            for (const cat of categories) {
                const existing = await BlogCategory.findOne({ where: { slug: cat.slug } });
                if (!existing) {
                    await BlogCategory.create(cat);
                    console.log(`Seeded category: ${cat.name}`);
                }
            }
        } catch (error) {
            console.error("Error seeding blog categories:", error);
        }

        // Manual check for 'status' column in 'orders' table to avoid 'alter: true' issues (kept as fallback though alter: true handles most)
        try {
            const tableDesc = await sequelize.getQueryInterface().describeTable('orders');
            if (!tableDesc.status) {
                // Double check just in case alter didn't catch it or for safety
                // ... logic kept largely same or simplified since alter:true should handle it.
                // But let's keep the user's manual logic for safety if they prefer specific defaults
                /*   console.log("Adding missing 'status' column to 'orders' table...");
                   await sequelize.getQueryInterface().addColumn('orders', 'status', {
                       type: DataTypes.STRING,
                       allowNull: false,
                       defaultValue: "pending"
                   }); 
                   console.log("'status' column added successfully."); */
            }
        } catch (error) {
            console.error("Error checking/adding 'status' column:", error);
        }

        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    })
    .catch(err => console.error("Error:", err));