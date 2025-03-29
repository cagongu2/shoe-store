const express = require('express');
const {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} = require("../controllers/product.controller");
const upload = require('../middleware/upload');

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", upload.array("images", 5), createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;