const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

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


app.use("/uploads", express.static(path.join(__dirname, "src/assets/uploads")));

app.listen(port, () => {
    sequelize.sync({ alter: true })
        .then(() => console.log("Database Synchronized!"))
        .catch(err => console.error("Error:", err));
    console.log(`App listening on port ${port}`)
})